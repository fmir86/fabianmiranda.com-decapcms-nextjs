import Head from 'next/head';
import { useRouter } from 'next/router';

const SEO = ({
  title = 'Fabian Miranda - Creative Technologist',
  description = 'Full-stack developer and creative technologist specializing in web development, digital production, and tech consulting.',
  image = '/images/og-default.jpg',
  type = 'website',
  author = 'Fabian Miranda',
  keywords = ''
}) => {
  const router = useRouter();
  const siteUrl = 'https://fabianmiranda.com';
  const canonicalUrl = `${siteUrl}${router.asPath}`;

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
      <meta property="og:locale" content="en_US" />

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
