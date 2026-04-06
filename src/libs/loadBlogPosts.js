import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function loadBlogPosts(locale = 'en') {
  const basePath = `content/blog/${locale}`;
  const blogDirectory = path.join(process.cwd(), basePath);
  const filenames = fs.readdirSync(blogDirectory);

  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(blogDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      // Use frontmatter slug if available, otherwise derive from filename
      const filenameSlug = filename.replace(/\.md$/, '');
      const slug = data.slug || filenameSlug;

      const post = {
        slug,
        filename: filenameSlug,
        title: data.title,
        excerpt: data.excerpt || '',
        author: data.author || 'Fabian Miranda',
        body: content,
      };

      // Handle date - convert to ISO string if it's a Date object
      if (data.date) {
        post.date = typeof data.date === 'string' ? data.date : data.date.toISOString();
      }

      // Optional fields - only include if they exist
      if (data.featured_image) {
        post.featuredImage = data.featured_image;
      }

      if (data.categories && data.categories.length > 0) {
        post.categories = data.categories;
      }

      if (data.tags && data.tags.length > 0) {
        post.tags = data.tags;
      }

      if (typeof data.published !== 'undefined') {
        post.published = data.published;
      }

      if (typeof data.featured !== 'undefined') {
        post.featured = data.featured;
      }

      // dateModified for SEO/GEO
      if (data.dateModified) {
        post.dateModified = typeof data.dateModified === 'string' ? data.dateModified : data.dateModified.toISOString();
      }

      // GEO fields
      if (data.key_takeaways && data.key_takeaways.length > 0) {
        post.keyTakeaways = data.key_takeaways;
      }

      if (data.related_posts && data.related_posts.length > 0) {
        post.relatedPostSlugs = data.related_posts;
      }

      if (data.faq && data.faq.length > 0) {
        post.faq = data.faq;
      }

      if (data.howto && data.howto.steps && data.howto.steps.length > 0) {
        post.howto = data.howto;
      }

      return post;
    })
    // Filter out unpublished posts
    .filter(post => post.published !== false)
    // Sort by date descending (newest first)
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });

  return posts;
}
