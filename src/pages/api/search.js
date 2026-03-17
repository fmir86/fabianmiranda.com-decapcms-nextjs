import Fuse from 'fuse.js';
import { loadBlogPosts } from '../../libs/loadBlogPosts';

// Cache the posts and Fuse indices per locale
const cache = {};

function initializeSearch(locale = 'en') {
  if (cache[locale]) return cache[locale];

  const cachedPosts = loadBlogPosts(locale);

  // Extract unique categories and tags
  const categoriesSet = new Set();
  const tagsSet = new Set();

  cachedPosts.forEach(post => {
    if (post.categories) {
      post.categories.forEach(cat => categoriesSet.add(cat));
    }
    if (post.tags) {
      post.tags.forEach(tag => tagsSet.add(tag));
    }
  });

  const allCategories = Array.from(categoriesSet).sort();
  const allTags = Array.from(tagsSet).sort();

  // Create Fuse index for posts
  const postsFuse = new Fuse(cachedPosts, {
    keys: [
      { name: 'title', weight: 0.35 },
      { name: 'excerpt', weight: 0.25 },
      { name: 'body', weight: 0.2 },
      { name: 'tags', weight: 0.1 },
      { name: 'categories', weight: 0.1 }
    ],
    threshold: 0.3,
    ignoreLocation: true,
    includeScore: true
  });

  // Create Fuse index for categories
  const categoriesFuse = new Fuse(
    allCategories.map(cat => ({ name: cat })),
    { keys: ['name'], threshold: 0.3, includeScore: true }
  );

  // Create Fuse index for tags
  const tagsFuse = new Fuse(
    allTags.map(tag => ({ name: tag })),
    { keys: ['name'], threshold: 0.3, includeScore: true }
  );

  cache[locale] = { cachedPosts, postsFuse, categoriesFuse, tagsFuse, allCategories, allTags };
  return cache[locale];
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q, locale = 'en' } = req.query;

  // Initialize search indices if not already done
  const { postsFuse, categoriesFuse, tagsFuse, allCategories, allTags } = initializeSearch(locale);

  // If no query, return empty results with all categories/tags for the dropdown
  if (!q || q.trim() === '') {
    return res.status(200).json({
      posts: [],
      categories: allCategories,
      tags: allTags,
      query: ''
    });
  }

  const query = q.trim();

  // Search posts (limit to top 5 for suggestions)
  const postResults = postsFuse.search(query, { limit: 5 });
  const matchedPosts = postResults.map(result => ({
    slug: result.item.slug,
    title: result.item.title,
    excerpt: result.item.excerpt,
    featuredImage: result.item.featuredImage,
    score: result.score
  }));

  // Search categories
  const categoryResults = categoriesFuse.search(query, { limit: 5 });
  const matchedCategories = categoryResults.map(result => result.item.name);

  // Search tags
  const tagResults = tagsFuse.search(query, { limit: 8 });
  const matchedTags = tagResults.map(result => result.item.name);

  return res.status(200).json({
    posts: matchedPosts,
    categories: matchedCategories,
    tags: matchedTags,
    query
  });
}
