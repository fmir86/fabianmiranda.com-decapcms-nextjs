import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Loads a compact summary of all site content for AI chatbot context.
 * Optimized for token efficiency — titles, descriptions, tags, and URLs only.
 * Full blog post bodies are excluded to keep costs low.
 */
export function loadSiteContent(locale = 'en') {
  const sections = [];

  // Load pages — extract key fields only
  const pagesDir = path.join(process.cwd(), 'content/pages');
  if (fs.existsSync(pagesDir)) {
    const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.md'));
    for (const file of pageFiles) {
      const raw = fs.readFileSync(path.join(pagesDir, file), 'utf8');
      const { data } = matter(raw);
      const localeData = data[locale] || data['en'];
      if (localeData) {
        const pageName = file.replace('.md', '');
        sections.push(`[Page: ${pageName}]\n${summarizePage(localeData)}`);
      }
    }
  }

  // Load blog posts — title, excerpt, date, tags, slug only
  const blogDir = path.join(process.cwd(), `content/blog/${locale}`);
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
    for (const file of blogFiles) {
      const raw = fs.readFileSync(path.join(blogDir, file), 'utf8');
      const { data } = matter(raw);
      if (data.published !== false) {
        const slug = data.slug || file.replace('.md', '');
        const parts = [`[Blog: ${data.title || file}]`];
        if (data.excerpt) parts.push(data.excerpt);
        if (data.date) parts.push(`Date: ${typeof data.date === 'string' ? data.date : data.date.toISOString().split('T')[0]}`);
        if (data.categories?.length) parts.push(`Categories: ${data.categories.join(', ')}`);
        if (data.tags?.length) parts.push(`Tags: ${data.tags.join(', ')}`);
        parts.push(`URL: /blog/${slug}`);
        sections.push(parts.join('\n'));
      }
    }
  }

  // Load case studies — title, description, tags, slug only
  const casesDir = path.join(process.cwd(), `content/case-studies/${locale}`);
  if (fs.existsSync(casesDir)) {
    const caseFiles = fs.readdirSync(casesDir).filter(f => f.endsWith('.md'));
    for (const file of caseFiles) {
      const raw = fs.readFileSync(path.join(casesDir, file), 'utf8');
      const { data } = matter(raw);
      const slug = data.slug || file.replace('.md', '');
      const parts = [`[Work: ${data.title || file}]`];
      if (data.description) parts.push(data.description);
      if (data.tags?.length) parts.push(`Tags: ${data.tags.join(', ')}`);
      if (data.live_url) parts.push(`Live: ${data.live_url}`);
      parts.push(`URL: /work/${slug}`);
      sections.push(parts.join('\n'));
    }
  }

  return sections.join('\n\n');
}

/**
 * Extracts key text fields from a page data object.
 * Skips images, nested objects, and long arrays.
 */
function summarizePage(obj, depth = 0) {
  if (depth > 2) return '';
  const lines = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;
    // Skip image/media fields
    if (/image|logo|icon|svg|img|photo|background/i.test(key)) continue;
    if (typeof value === 'string' && value.length > 0) {
      // Skip paths/URLs that aren't useful for context
      if (value.startsWith('/img/') || value.startsWith('http')) continue;
      lines.push(`${key}: ${value.slice(0, 300)}`);
    } else if (Array.isArray(value)) {
      const textItems = value
        .map(v => typeof v === 'string' ? v : (v?.title || v?.name || v?.text || v?.label || ''))
        .filter(Boolean)
        .slice(0, 10);
      if (textItems.length) lines.push(`${key}: ${textItems.join(', ')}`);
    } else if (typeof value === 'object') {
      const nested = summarizePage(value, depth + 1);
      if (nested) lines.push(`${key}:\n${nested}`);
    }
  }
  return lines.join('\n');
}
