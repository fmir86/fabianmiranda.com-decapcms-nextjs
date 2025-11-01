import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function loadHeaderData() {
  const headerPath = path.join(process.cwd(), 'content/global/header.md');
  const fileContents = fs.readFileSync(headerPath, 'utf8');
  const { data } = matter(fileContents);

  return {
    logo: data.logo,
    navigation: data.navigation || []
  };
}

export function loadFooterData() {
  const footerPath = path.join(process.cwd(), 'content/global/footer.md');
  const fileContents = fs.readFileSync(footerPath, 'utf8');
  const { data } = matter(fileContents);

  return {
    logoSvg: data.logo_svg,
    navigation: data.navigation || [],
    socialLinks: data.social_links || [],
    copyright: data.copyright || ''
  };
}
