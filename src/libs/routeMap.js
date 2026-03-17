// Static page route translations: EN path → ES path (without /es prefix)
const esStaticRoutes = {
  '/': '/',
  '/about': '/acerca-de-mi',
  '/services': '/servicios',
  '/contact': '/contacto',
  '/work': '/portafolio',
  '/blog': '/blog',
};

// Reverse lookup: ES path → EN path
const enStaticRoutes = {};
for (const [en, es] of Object.entries(esStaticRoutes)) {
  enStaticRoutes[es] = en;
}

/**
 * Translate an internal path for the given locale.
 * Pass the EN-style path; returns the locale-appropriate path.
 * Next.js i18n automatically adds the /es prefix.
 *
 * Examples:
 *   localePath('/about', 'es') → '/acerca-de-mi'
 *   localePath('/work/sibu-wellness', 'es') → '/portafolio/sibu-wellness'
 *   localePath('/blog/my-post', 'en') → '/blog/my-post'
 */
export function localePath(path, locale) {
  if (!locale || locale === 'en') return path;

  // Exact static route match
  if (esStaticRoutes[path]) return esStaticRoutes[path];

  // Dynamic route: translate the base path
  for (const [enBase, esBase] of Object.entries(esStaticRoutes)) {
    if (enBase !== '/' && path.startsWith(enBase + '/')) {
      return esBase + path.slice(enBase.length);
    }
  }

  return path;
}

/**
 * Given an ES-style path (without locale prefix), return the EN equivalent.
 * Used by the language switcher when navigating from ES → EN.
 */
export function enPath(esPathStr) {
  if (enStaticRoutes[esPathStr]) return enStaticRoutes[esPathStr];

  for (const [es, en] of Object.entries(enStaticRoutes)) {
    if (es !== '/' && esPathStr.startsWith(es + '/')) {
      return en + esPathStr.slice(es.length);
    }
  }

  return esPathStr;
}

/**
 * Translate a full path (with /es prefix) for sitemap generation.
 */
export function translateSitemapPath(path) {
  if (!path.startsWith('/es')) return path;

  const withoutPrefix = path.slice(3) || '/';

  // Static routes
  if (esStaticRoutes[withoutPrefix]) {
    const translated = esStaticRoutes[withoutPrefix];
    return translated === '/' ? '/es' : `/es${translated}`;
  }

  // Dynamic routes: translate base path
  for (const [enBase, esBase] of Object.entries(esStaticRoutes)) {
    if (enBase !== '/' && withoutPrefix.startsWith(enBase + '/')) {
      return `/es${esBase}${withoutPrefix.slice(enBase.length)}`;
    }
  }

  return path;
}

export { esStaticRoutes, enStaticRoutes };
