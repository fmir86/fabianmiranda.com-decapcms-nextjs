import { ensureSession, logConversation } from '../../libs/chatAnalytics';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId, locale, userMessage, botResponse } = req.body;

  if (!sessionId || !userMessage) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await ensureSession(sessionId, locale || 'en');
    await logConversation({
      sessionId,
      locale: locale || 'en',
      userMessage,
      botResponse: botResponse || '',
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[Alfred Analytics] Log error:', err.message);
    res.status(500).json({ error: 'Failed to log' });
  }
}
