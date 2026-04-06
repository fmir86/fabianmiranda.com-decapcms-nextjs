import Head from 'next/head';

const SITE_URL = 'https://fabianmiranda.com';

// Person Schema - Establishes Fabian Miranda's identity
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Fabian Miranda',
  givenName: 'Fabian',
  familyName: 'Miranda',
  alternateName: 'Fabián Miranda',
  jobTitle: 'AI Solutions Architect & Implementation Consultant',
  description: 'AI Solutions Architect and full-stack developer specializing in AI implementation consulting, web development, digital production, and nearshore tech solutions from Costa Rica.',
  url: SITE_URL,
  image: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/portrait.png`,
    width: 800,
    height: 800
  },
  sameAs: [
    'https://www.linkedin.com/in/fmir86/',
    'https://github.com/fmir86'
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'AI Solutions Architecture',
    'AI Implementation Consulting',
    'AI Consulting',
    'Web Development',
    'Full-Stack Development',
    'Digital Production',
    'Nearshore Development',
    'React',
    'Next.js',
    'Node.js',
    'Tech Consulting',
    'RAG Systems',
    'AI Agent Development'
  ],
  worksFor: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Fabian Miranda Consulting'
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San José',
    addressCountry: 'CR',
    addressRegion: 'Costa Rica'
  },
  nationality: {
    '@type': 'Country',
    name: 'Costa Rica'
  }
};

// Organization/ProfessionalService Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: 'Fabian Miranda Consulting',
  alternateName: 'Fabian Miranda - Creative Technologist',
  description: 'Expert technology consulting services including AI implementation, full-stack web development, digital production, and nearshore development solutions from Costa Rica.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/og-default-v2.jpg`,
    width: 1200,
    height: 630
  },
  image: `${SITE_URL}/images/og-default-v2.jpg`,
  founder: {
    '@id': `${SITE_URL}/#person`
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San José',
    addressCountry: 'CR',
    addressRegion: 'Costa Rica'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 9.9281,
    longitude: -84.0907
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'United States'
    },
    {
      '@type': 'Country',
      name: 'Costa Rica'
    },
    {
      '@type': 'Place',
      name: 'Latin America'
    },
    {
      '@type': 'Place',
      name: 'Worldwide'
    }
  ],
  knowsAbout: [
    'AI Consulting',
    'Web Development',
    'Full-Stack Development',
    'Digital Production',
    'Tech Consulting',
    'Nearshore Development'
  ],
  priceRange: '$$',
  sameAs: [
    'https://www.linkedin.com/in/fmir86/',
    'https://github.com/fmir86'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: `${SITE_URL}/contact`,
    availableLanguage: ['English', 'Spanish']
  }
};

// WebSite Schema (generated per locale)
export const generateWebsiteSchema = (locale = 'en') => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Fabian Miranda - Creative Technologist',
  description: 'Portfolio and blog of Fabian Miranda, a creative technologist and AI consultant based in Costa Rica.',
  url: SITE_URL,
  publisher: {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Fabian Miranda'
  },
  inLanguage: getLanguageCode(locale)
});

// Helper to get language code from locale
const getLanguageCode = (locale) => locale === 'es' ? 'es-CR' : 'en-US';

// Generate Article/BlogPosting Schema
export const generateArticleSchema = (article, locale = 'en') => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${SITE_URL}/blog/${article.slug}#article`,
  headline: article.title,
  description: article.excerpt || article.description,
  image: article.featured_image
    ? (article.featured_image.startsWith('http') ? article.featured_image : `${SITE_URL}${article.featured_image}`)
    : `${SITE_URL}/images/og-default-v2.jpg`,
  datePublished: article.date,
  dateModified: article.dateModified || article.date,
  author: {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Fabian Miranda',
    url: SITE_URL
  },
  publisher: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Fabian Miranda Consulting',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/og-default-v2.jpg`
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/blog/${article.slug}`
  },
  keywords: article.tags ? article.tags.join(', ') : '',
  articleSection: article.categories ? article.categories.join(', ') : 'Technology',
  inLanguage: getLanguageCode(locale)
});

// Generate Case Study/Project Schema
export const generateCaseStudySchema = (caseStudy, locale = 'en') => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  '@id': `${SITE_URL}/work/${caseStudy.slug}#project`,
  name: caseStudy.title,
  description: caseStudy.description,
  image: caseStudy.image
    ? (caseStudy.image.startsWith('http') ? caseStudy.image : `${SITE_URL}${caseStudy.image}`)
    : `${SITE_URL}/images/og-default-v2.jpg`,
  dateCreated: caseStudy.date,
  creator: {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Fabian Miranda',
    url: SITE_URL
  },
  url: caseStudy.liveUrl || `${SITE_URL}/work/${caseStudy.slug}`,
  keywords: caseStudy.tags ? caseStudy.tags.join(', ') : '',
  inLanguage: getLanguageCode(locale)
});

// Generate Breadcrumb Schema
export const generateBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url ? `${SITE_URL}${item.url}` : undefined
  }))
});

// Services Schema for Services Page
export const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/services#services`,
  name: 'Nearshore Development & AI Consulting Services',
  description: 'Nearshore software development and AI consulting from Costa Rica. Full-stack web development, digital production, and AI-powered automation for US and global clients.',
  itemListElement: [
    {
      '@type': 'Service',
      position: 1,
      name: 'AI-Powered Software Development',
      description: 'Nearshore full-stack web development from Costa Rica. Custom web applications using React, Next.js, Node.js with AI-powered development workflows for faster delivery.',
      provider: {
        '@id': `${SITE_URL}/#organization`
      },
      areaServed: 'Worldwide',
      serviceType: 'Nearshore Software Development'
    },
    {
      '@type': 'Service',
      position: 2,
      name: 'Digital Production',
      description: 'Nearshore digital production services. Display ads, dynamic banner campaigns, rich media experiences, HTML email templates, and social media video ads for enterprise clients.',
      provider: {
        '@id': `${SITE_URL}/#organization`
      },
      areaServed: 'Worldwide',
      serviceType: 'Digital Production'
    },
    {
      '@type': 'Service',
      position: 3,
      name: 'AI Consulting & Implementation',
      description: 'Strategic AI consulting from Costa Rica. AI strategy, implementation with Claude/ChatGPT/Gemini, workflow automation, RAG systems, and AI agent development for enterprise clients.',
      provider: {
        '@id': `${SITE_URL}/#organization`
      },
      areaServed: 'Worldwide',
      serviceType: 'AI Consulting'
    }
  ]
};

// FAQ Schema for Services Page
export const servicesFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/services#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is nearshore software development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nearshore software development means partnering with developers in a nearby country with similar timezones. Working with a developer in Costa Rica (GMT-6) gives US companies real-time collaboration during business hours, cultural alignment, and 40-50% cost savings compared to US rates.'
      }
    },
    {
      '@type': 'Question',
      name: 'What AI implementation services do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I offer AI strategy and implementation consulting including RAG (Retrieval Augmented Generation) systems, AI agent development with MCP integrations, workflow automation using Claude, ChatGPT, and Gemini Pro, and AI-powered development workflows. Services include discovery, pilot development, and scaled deployment with clear ROI measurement within 30-60 days.'
      }
    },
    {
      '@type': 'Question',
      name: 'What technologies do you work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'My core stack includes React, Next.js, and Node.js for full-stack web development. I also work with React Native and Flutter for mobile apps, and deploy across AWS, Azure, Vercel, and Netlify. For AI integration, I specialize in Anthropic Claude, OpenAI, and Google Gemini APIs.'
      }
    },
    {
      '@type': 'Question',
      name: 'How does your consulting engagement typically work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Engagements start with a free 30-minute discovery call. From there, I define project scope, provide a detailed proposal, and begin with a pilot phase. I follow Agile methodologies with daily standups, weekly retrospectives, and transparent progress tracking. Most clients see measurable results within the first 30-60 days.'
      }
    }
  ]
};

// SchemaMarkup Component
// Generate FAQ Schema from array of {question, answer} objects
export const generateFaqSchema = (faqItems) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
});

const SchemaMarkup = ({
  type = 'website',
  article = null,
  caseStudy = null,
  breadcrumbs = null,
  faq = null,
  includeServices = false,
  locale = 'en'
}) => {
  const schemas = [];

  // Always include Person and Organization on homepage
  if (type === 'website' || type === 'homepage') {
    schemas.push(personSchema);
    schemas.push(organizationSchema);
    schemas.push(generateWebsiteSchema(locale));
  }

  // Include Person schema on About page
  if (type === 'about') {
    schemas.push(personSchema);
  }

  // Include Services schema
  if (type === 'services' || includeServices) {
    schemas.push(servicesSchema);
    schemas.push(organizationSchema);
    schemas.push(servicesFaqSchema);
  }

  // Include Article schema for blog posts
  if (type === 'article' && article) {
    schemas.push(generateArticleSchema(article, locale));
  }

  // Include FAQ schema if faq items provided (blog posts or any page)
  if (faq && faq.length > 0) {
    schemas.push(generateFaqSchema(faq));
  }

  // Include Case Study schema
  if (type === 'caseStudy' && caseStudy) {
    schemas.push(generateCaseStudySchema(caseStudy, locale));
  }

  // Include Breadcrumbs if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  // If no specific schemas, at least include person reference
  if (schemas.length === 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      isPartOf: {
        '@id': `${SITE_URL}/#website`
      },
      author: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Fabian Miranda'
      }
    });
  }

  return (
    <Head>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
};

export default SchemaMarkup;
