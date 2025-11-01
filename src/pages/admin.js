import Head from 'next/head';
import Script from 'next/script';

const Admin = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Content Manager</title>
        <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />
      </Head>
      <Script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" strategy="afterInteractive" />
    </>
  );
};

export default Admin;
