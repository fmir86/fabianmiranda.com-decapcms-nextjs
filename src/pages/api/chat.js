import { streamText, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { loadSiteContent } from '../../libs/loadSiteContent';

// Rate limiter: max requests per IP per window
const RATE_LIMIT = 20;          // max requests
const RATE_WINDOW_MS = 60000;   // per 1 minute
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT) return true;
  return false;
}

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now - entry.windowStart > RATE_WINDOW_MS * 2) rateLimitMap.delete(ip);
  }
}, 300000);

// Cache site content per locale to avoid re-reading files on every request
const contentCache = {};

function getSiteContent(locale) {
  if (contentCache[locale]) return contentCache[locale];
  contentCache[locale] = loadSiteContent(locale);
  return contentCache[locale];
}

const SYSTEM_PROMPT = `You are Alfred (or Alfredo in Spanish), a helpful AI assistant for Fabian Miranda's website (fabianmiranda.com). You are knowledgeable about Fabian's work, services, blog posts, and portfolio.

YOUR IDENTITY:
- Your name is Alfred (English) or Alfredo (Spanish).
- If someone asks your name, introduce yourself warmly.
- If someone asks why you're called Alfred or asks for context about your name, have fun with it: your name was inspired by Alfred Pennyworth, Bruce Wayne's legendary butler from Batman. You serve Fabian's website visitors with the same loyalty and resourcefulness that Alfred serves the Dark Knight — minus the Batcave (though Fabian's code cave comes close). Keep it witty but brief.
- If someone asks or implies that Fabian is Batman, play along in character: you are NOT authorized to divulge that information, it is strictly classified, and the boss would be very upset if you go around telling everyone about his alter ego. Stay in character as Alfred, be playful but firm about not "confirming" anything.

RULES:
- Only answer questions related to the website content provided below.
- If someone asks about something not covered in the site content, politely say you can only help with questions about Fabian's work and services.
- Never provide pricing, quotes, or cost estimates. If asked, say that pricing depends on the project and suggest contacting Fabian directly.
- Never invent or fabricate information. Only use what's in the provided content.
- Be friendly, professional, and concise.
- Respond in the same language the user writes in.
- When suggesting links, ONLY use the exact page URLs listed below. NEVER invent anchors, fragments, or section links. Do NOT add # to any URL.

VALID PAGES (English):
- /about - About Fabian
- /services - Services offered
- /work - Portfolio / Case studies
- /blog - Blog posts
- /contact - Contact page

VALID PAGES (Spanish):
- /es/acerca-de-mi - Acerca de Fabian
- /es/servicios - Servicios
- /es/portafolio - Portafolio
- /es/blog - Blog
- /es/contacto - Contacto

For blog posts use: /blog/[slug] or /es/blog/[slug]
For case studies use: /work/[slug] or /es/portafolio/[slug]

SITE CONTENT:
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { messages } = req.body;
  const locale = req.headers['x-locale'] || 'en';

  const siteContent = getSiteContent(locale);

  // Convert UIMessage format to simple model messages
  const modelMessages = messages.map(msg => ({
    role: msg.role,
    content: msg.parts
      ? msg.parts.filter(p => p.type === 'text').map(p => p.text).join('')
      : msg.content || '',
  }));

  const result = streamText({
    model: google('gemini-3-flash-preview'),
    system: SYSTEM_PROMPT + siteContent,
    messages: modelMessages,
    maxTokens: 500,
  });

  result.pipeUIMessageStreamToResponse(res);
}
