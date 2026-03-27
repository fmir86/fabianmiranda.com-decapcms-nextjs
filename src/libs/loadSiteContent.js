import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Loads all site content (pages, blog posts, case studies) as plain text
 * for use as AI chatbot context.
 */
export function loadSiteContent(locale = 'en') {
  const sections = [];

  // Load pages
  const pagesDir = path.join(process.cwd(), 'content/pages');
  if (fs.existsSync(pagesDir)) {
    const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.md'));
    for (const file of pageFiles) {
      const raw = fs.readFileSync(path.join(pagesDir, file), 'utf8');
      const { data } = matter(raw);
      const localeData = data[locale] || data['en'];
      if (localeData) {
        const pageName = file.replace('.md', '');
        sections.push(`[Page: ${pageName}]\n${flattenObject(localeData)}`);
      }
    }
  }

  // Load blog posts
  const blogDir = path.join(process.cwd(), `content/blog/${locale}`);
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
    for (const file of blogFiles) {
      const raw = fs.readFileSync(path.join(blogDir, file), 'utf8');
      const { data, content } = matter(raw);
      if (data.published !== false) {
        sections.push(
          `[Blog: ${data.title || file}]\n${data.excerpt || ''}\n${content.slice(0, 1500)}`
        );
      }
    }
  }

  // Load case studies
  const casesDir = path.join(process.cwd(), `content/case-studies/${locale}`);
  if (fs.existsSync(casesDir)) {
    const caseFiles = fs.readdirSync(casesDir).filter(f => f.endsWith('.md'));
    for (const file of caseFiles) {
      const raw = fs.readFileSync(path.join(casesDir, file), 'utf8');
      const { data } = matter(raw);
      sections.push(
        `[Work: ${data.title || file}]\n${data.description || ''}\nTags: ${(data.tags || []).join(', ')}`
      );
    }
  }

  return sections.join('\n\n---\n\n');
}

function flattenObject(obj, prefix = '') {
  const lines = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;
    if (typeof value === 'object' && !Array.isArray(value)) {
      lines.push(flattenObject(value, `${prefix}${key}.`));
    } else if (Array.isArray(value)) {
      lines.push(`${prefix}${key}: ${value.map(v => typeof v === 'object' ? JSON.stringify(v) : v).join(', ')}`);
    } else {
      lines.push(`${prefix}${key}: ${value}`);
    }
  }
  return lines.join('\n');
}
