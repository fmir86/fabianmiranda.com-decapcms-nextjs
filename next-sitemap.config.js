// Spanish route translations for sitemap (mirrors src/libs/routeMap.js)
const esStaticRoutes = {
  '/about': '/acerca-de-mi',
  '/services': '/servicios',
  '/contact': '/contacto',
  '/work': '/portafolio',
  '/blog': '/blog',
};

function translateEsPath(path) {
  if (!path.startsWith('/es')) return path;
  const withoutPrefix = path.slice(3) || '/';

  // Static routes
  for (const [en, es] of Object.entries(esStaticRoutes)) {
    if (withoutPrefix === en) {
      return es === '/' ? '/es' : `/es${es}`;
    }
  }

  // Dynamic routes: /es/work/slug → /es/portafolio/slug
  for (const [en, es] of Object.entries(esStaticRoutes)) {
    if (en !== '/' && withoutPrefix.startsWith(en + '/')) {
      return `/es${es}${withoutPrefix.slice(en.length)}`;
    }
  }

  return path;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://fabianmiranda.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin', '/admin/*', '/404', '/es/404'],

  // No global alternateRefs — we handle hreflang per-entry in transform
  // because translated paths differ between EN and ES.
  // HTML <link rel="alternate"> tags in the SEO component provide hreflang to crawlers.

  // Custom robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin'],
      },
      ...['Googlebot', 'Googlebot-Image', 'Googlebot-News', 'Googlebot-Video',
        'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'YandexBot',
        'Sogou', 'Exabot', 'facebot', 'ia_archiver',
        'GPTBot', 'ChatGPT-User', 'Google-Extended', 'GoogleOther',
        'anthropic-ai', 'ClaudeBot', 'Claude-Web', 'PerplexityBot',
        'Applebot', 'Applebot-Extended', 'cohere-ai', 'YouBot',
        'Diffbot', 'ImagesiftBot', 'Omgilibot', 'FacebookBot', 'PetalBot',
      ].map(bot => ({ userAgent: bot, allow: '/' })),
    ],
    additionalSitemaps: [],
  },

  changefreq: 'daily',
  priority: 0.7,

  transform: async (config, path) => {
    const isEsPath = path.startsWith('/es');
    const cleanPath = path.replace(/^\/es/, '') || '/';

    // Translate ES paths to their public URLs (e.g. /es/work → /es/portafolio)
    const loc = isEsPath ? translateEsPath(path) : path;

    // Determine priority based on the clean (EN-style) path
    let changefreq = config.changefreq;
    let priority = config.priority;

    if (cleanPath === '/') {
      changefreq = 'daily';
      priority = 1.0;
    } else if (cleanPath.startsWith('/blog/') || cleanPath.startsWith('/work/')) {
      changefreq = cleanPath.startsWith('/blog/') ? 'weekly' : 'monthly';
      priority = 0.9;
    } else if (['/blog', '/work', '/services', '/about', '/contact'].includes(cleanPath)) {
      changefreq = 'weekly';
      priority = 0.8;
    }

    return {
      loc,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },
}
