import Head from 'next/head';
import { useRouter } from 'next/router';
import { localePath, enPath } from '../../libs/routeMap';

const SEO = ({
  title = 'Fabian Miranda - Creative Technologist',
  description = 'Full-stack developer and creative technologist specializing in web development, digital production, and tech consulting.',
  image = '/images/og-default-v2.jpg',
  type = 'website',
  author = 'Fabian Miranda',
  keywords = '',
  locale = 'en',
  alternateSlug,
}) => {
  const router = useRouter();
  const siteUrl = 'https://fabianmiranda.com';
  const { pathname, asPath } = router;

  // Compute the current page's visible path (without locale prefix)
  // For ES with rewrites, asPath shows the translated URL (e.g. /acerca-de-mi)
  const currentPath = asPath;

  // Build canonical URL
  const canonicalUrl = locale === 'es'
    ? `${siteUrl}/es${currentPath === '/' ? '' : currentPath}`
    : `${siteUrl}${currentPath}`;

  // Compute alternate URLs for hreflang
  // EN URL: use the Next.js pathname (always EN-style like /about, /blog/[slug])
  // ES URL: translate to Spanish paths
  let enUrl, esUrl;

  if (pathname.includes('[slug]') && alternateSlug) {
    // Dynamic pages: use alternateSlug for the other locale
    if (locale === 'en') {
      enUrl = `${siteUrl}${currentPath}`;
      const esBase = localePath(pathname.replace('/[slug]', ''), 'es');
      esUrl = `${siteUrl}/es${esBase}/${alternateSlug}`;
    } else {
      const enBase = pathname.replace('/[slug]', '');
      const currentSlug = currentPath.split('/').pop();
      enUrl = `${siteUrl}${enBase}/${alternateSlug}`;
      esUrl = `${siteUrl}/es${currentPath}`;
    }
  } else {
    // Static pages: use route map
    enUrl = `${siteUrl}${locale === 'es' ? enPath(currentPath) : currentPath}`;
    const esTranslated = localePath(locale === 'es' ? enPath(currentPath) : currentPath, 'es');
    esUrl = `${siteUrl}/es${esTranslated === '/' ? '' : esTranslated}`;
  }

  // OG locale
  const ogLocale = locale === 'es' ? 'es_CR' : 'en_US';
  const ogLocaleAlternate = locale === 'es' ? 'en_US' : 'es_CR';

  // Ensure image is absolute URL
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  // Determine image type from extension
  const getImageType = (url) => {
    if (url.endsWith('.png')) return 'image/png';
    if (url.endsWith('.jpg') || url.endsWith('.jpeg')) return 'image/jpeg';
    if (url.endsWith('.webp')) return 'image/webp';
    if (url.endsWith('.gif')) return 'image/gif';
    return 'image/jpeg'; // default
  };
  const imageType = getImageType(imageUrl);

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags */}
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="es" href={esUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content={imageType} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Fabian Miranda" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlternate} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@fabianmiranda" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
    </Head>
  );
};

export default SEO;
