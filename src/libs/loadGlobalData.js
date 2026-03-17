import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function loadHeaderData(locale = 'en') {
  const headerPath = path.join(process.cwd(), 'content/global/header.md');
  const fileContents = fs.readFileSync(headerPath, 'utf8');
  const { data } = matter(fileContents);
  const localeData = data[locale] || data['en'];

  return {
    logo: localeData.logo,
    navigation: localeData.navigation || []
  };
}

export function loadFooterData(locale = 'en') {
  const footerPath = path.join(process.cwd(), 'content/global/footer.md');
  const fileContents = fs.readFileSync(footerPath, 'utf8');
  const { data } = matter(fileContents);
  const localeData = data[locale] || data['en'];

  return {
    logoSvg: localeData.logo_svg,
    navigation: localeData.navigation || [],
    socialLinks: localeData.social_links || [],
    copyright: localeData.copyright || ''
  };
}
