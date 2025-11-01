import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function loadBlogPosts() {
  const blogDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(blogDirectory);

  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(blogDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      // Create slug from filename
      const slug = filename.replace(/\.md$/, '');

      const post = {
        slug,
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
