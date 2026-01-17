import Fuse from 'fuse.js';
import { loadBlogPosts } from '../../libs/loadBlogPosts';

// Cache the posts and Fuse indices to avoid reloading on every request
let cachedPosts = null;
let postsFuse = null;
let categoriesFuse = null;
let tagsFuse = null;
let allCategories = [];
let allTags = [];

function initializeSearch() {
  if (cachedPosts) return;

  cachedPosts = loadBlogPosts();

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

  allCategories = Array.from(categoriesSet).sort();
  allTags = Array.from(tagsSet).sort();

  // Create Fuse index for posts
  postsFuse = new Fuse(cachedPosts, {
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
  categoriesFuse = new Fuse(
    allCategories.map(cat => ({ name: cat })),
    { keys: ['name'], threshold: 0.3, includeScore: true }
  );

  // Create Fuse index for tags
  tagsFuse = new Fuse(
    allTags.map(tag => ({ name: tag })),
    { keys: ['name'], threshold: 0.3, includeScore: true }
  );
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q } = req.query;

  // Initialize search indices if not already done
  initializeSearch();

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
