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
  jobTitle: 'Creative Technologist & AI Consultant',
  description: 'Full-stack developer and creative technologist specializing in AI consulting, web development, digital production, and nearshore tech solutions from Costa Rica.',
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
    'AI Consulting',
    'Web Development',
    'Full-Stack Development',
    'Digital Production',
    'Nearshore Development',
    'React',
    'Next.js',
    'Node.js',
    'Tech Consulting'
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
  serviceType: [
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

// WebSite Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Fabian Miranda - Creative Technologist',
  description: 'Portfolio and blog of Fabian Miranda, a creative technologist and AI consultant based in Costa Rica.',
  url: SITE_URL,
  publisher: {
    '@id': `${SITE_URL}/#person`
  },
  inLanguage: 'en-US'
};

// Generate Article/BlogPosting Schema
export const generateArticleSchema = (article) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${SITE_URL}/blog/${article.slug}#article`,
  headline: article.title,
  description: article.excerpt || article.description,
  image: article.featured_image
    ? (article.featured_image.startsWith('http') ? article.featured_image : `${SITE_URL}${article.featured_image}`)
    : `${SITE_URL}/images/og-default-v2.jpg`,
  datePublished: article.date,
  dateModified: article.date,
  author: {
    '@id': `${SITE_URL}/#person`
  },
  publisher: {
    '@id': `${SITE_URL}/#organization`
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/blog/${article.slug}`
  },
  keywords: article.tags ? article.tags.join(', ') : '',
  articleSection: article.categories ? article.categories.join(', ') : 'Technology',
  inLanguage: 'en-US'
});

// Generate Case Study/Project Schema
export const generateCaseStudySchema = (caseStudy) => ({
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
    '@id': `${SITE_URL}/#person`
  },
  url: caseStudy.liveUrl || `${SITE_URL}/work/${caseStudy.slug}`,
  keywords: caseStudy.tags ? caseStudy.tags.join(', ') : '',
  inLanguage: 'en-US'
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
  name: 'Technology Services by Fabian Miranda',
  description: 'Expert technology services including AI consulting, full-stack development, and digital production.',
  itemListElement: [
    {
      '@type': 'Service',
      position: 1,
      name: 'Full-Stack Web Development',
      description: 'Custom web applications using React, Next.js, Node.js, and modern frameworks. From responsive websites to complex enterprise solutions.',
      provider: {
        '@id': `${SITE_URL}/#organization`
      },
      areaServed: 'Worldwide',
      serviceType: 'Web Development'
    },
    {
      '@type': 'Service',
      position: 2,
      name: 'Digital Production',
      description: 'Display ads, dynamic banner campaigns, rich media experiences, HTML email templates, and social media video ads for pharmaceutical and enterprise clients.',
      provider: {
        '@id': `${SITE_URL}/#organization`
      },
      areaServed: 'Worldwide',
      serviceType: 'Digital Production'
    },
    {
      '@type': 'Service',
      position: 3,
      name: 'AI & Tech Consulting',
      description: 'Strategic AI implementation, technology architecture, team augmentation, and nearshore development consulting from Costa Rica.',
      provider: {
        '@id': `${SITE_URL}/#organization`
      },
      areaServed: 'Worldwide',
      serviceType: 'Technology Consulting'
    }
  ]
};

// SchemaMarkup Component
const SchemaMarkup = ({
  type = 'website',
  article = null,
  caseStudy = null,
  breadcrumbs = null,
  includeServices = false
}) => {
  const schemas = [];

  // Always include Person and Organization on homepage
  if (type === 'website' || type === 'homepage') {
    schemas.push(personSchema);
    schemas.push(organizationSchema);
    schemas.push(websiteSchema);
  }

  // Include Person schema on About page
  if (type === 'about') {
    schemas.push(personSchema);
  }

  // Include Services schema
  if (type === 'services' || includeServices) {
    schemas.push(servicesSchema);
    schemas.push(organizationSchema);
  }

  // Include Article schema for blog posts
  if (type === 'article' && article) {
    schemas.push(generateArticleSchema(article));
  }

  // Include Case Study schema
  if (type === 'caseStudy' && caseStudy) {
    schemas.push(generateCaseStudySchema(caseStudy));
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
        '@id': `${SITE_URL}/#person`
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
