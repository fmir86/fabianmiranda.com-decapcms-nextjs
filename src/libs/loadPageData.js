import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function loadPageData(pageName, locale = 'en') {
  const filePath = path.join(process.cwd(), `content/pages/${pageName}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  return data[locale] || data['en'];
}
