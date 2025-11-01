/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://fabianmiranda.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Since we have a small site, one sitemap is enough
  exclude: ['/admin', '/admin/*'],

  // Custom robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin'],
      },
      // Explicitly allow AI bots and search engines
      {
        userAgent: [
          'Googlebot',                // Google Search
          'Googlebot-Image',          // Google Images
          'Googlebot-News',           // Google News
          'Googlebot-Video',          // Google Video
          'Bingbot',                  // Bing Search
          'Slurp',                    // Yahoo
          'DuckDuckBot',              // DuckDuckGo
          'Baiduspider',              // Baidu
          'YandexBot',                // Yandex
          'Sogou',                    // Sogou
          'Exabot',                   // Exalead
          'facebot',                  // Facebook
          'ia_archiver',              // Alexa
        ],
        allow: '/',
      },
      // AI LLM Bots - Explicitly allow for training and indexing
      {
        userAgent: [
          'GPTBot',                   // OpenAI GPT crawler
          'ChatGPT-User',             // ChatGPT user agent
          'Google-Extended',          // Google Gemini/Bard
          'GoogleOther',              // Google other services
          'anthropic-ai',             // Anthropic Claude
          'ClaudeBot',                // Claude web crawler
          'Claude-Web',               // Claude web browser
          'PerplexityBot',            // Perplexity AI
          'Applebot',                 // Apple Intelligence
          'Applebot-Extended',        // Apple AI features
          'cohere-ai',                // Cohere AI
          'YouBot',                   // You.com
          'Diffbot',                  // Diffbot AI
          'ImagesiftBot',             // Image AI
          'Omgilibot',                // Omgili AI
          'FacebookBot',              // Meta AI
          'PetalBot',                 // Huawei AI
        ],
        allow: '/',
      },
    ],
    additionalSitemaps: [],
  },

  // Change frequency and priority settings
  changefreq: 'daily',
  priority: 0.7,

  // Transform function to set custom priorities and change frequencies
  transform: async (config, path) => {
    // Home page - highest priority
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    // Blog posts - high priority
    if (path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // Work/case studies - high priority
    if (path.startsWith('/work/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // Main sections - medium-high priority
    if (['/blog', '/work', '/services', '/about', '/contact'].includes(path)) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }

    // Default for other pages
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}
