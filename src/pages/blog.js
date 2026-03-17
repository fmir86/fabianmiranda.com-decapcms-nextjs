import Link from "next/link"
import Image from "next/image"
import { useState, useMemo, useEffect } from "react"
import Fuse from "fuse.js"
import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/SEO";
import SchemaMarkup from "../components/SEO/SchemaMarkup";
import BlogSearch from "../components/BlogSearch/BlogSearch";
import { loadHeaderData, loadFooterData } from "../libs/loadGlobalData";
import { loadBlogPosts } from "../libs/loadBlogPosts";
import { loadPageData } from "../libs/loadPageData";
import { t } from "../libs/translations";
import { localePath } from "../libs/routeMap";
import heroStyles from "../styles/About.module.scss"
import styles from "../styles/Blog.module.scss"
import useIsMobile from "../hooks/useIsMobile"
import useDebounce from "../hooks/useDebounce"

// Fuse.js configuration for search
const FUSE_OPTIONS = {
  keys: [
    { name: 'title', weight: 0.3 },
    { name: 'excerpt', weight: 0.2 },
    { name: 'body', weight: 0.2 },
    { name: 'tags', weight: 0.15 },
    { name: 'categories', weight: 0.15 }
  ],
  threshold: 0.3, // 0 = exact match, 1 = match anything
  ignoreLocation: true, // search entire content, not just beginning
  includeScore: true
};

const POSTS_PER_PAGE = 6;

const Blog = ({ posts, headerData, footerData, pageData, locale }) => {
  const { seo, hero, no_posts_message } = pageData;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  // Extract unique categories and tags
  const allCategories = useMemo(() => {
    const categoriesSet = new Set();
    posts.forEach(post => {
      if (post.categories) {
        post.categories.forEach(cat => categoriesSet.add(cat));
      }
    });
    return Array.from(categoriesSet).sort();
  }, [posts]);

  const allTags = useMemo(() => {
    const tagsSet = new Set();
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet).sort();
  }, [posts]);

  // Toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Create Fuse index once when posts change
  const fuse = useMemo(() => new Fuse(posts, FUSE_OPTIONS), [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    const query = debouncedSearchQuery.trim();

    // First, get search results (or all posts if no query)
    let searchResults = posts;
    if (query) {
      const fuseResults = fuse.search(query);
      searchResults = fuseResults.map(result => result.item);
    }

    // Then apply category and tag filters
    return searchResults.filter(post => {
      const categoryMatch = selectedCategories.length === 0 ||
        (post.categories && post.categories.some(cat => selectedCategories.includes(cat)));
      const tagMatch = selectedTags.length === 0 ||
        (post.tags && post.tags.some(tag => selectedTags.includes(tag)));

      return categoryMatch && tagMatch;
    });
  }, [posts, fuse, selectedCategories, selectedTags, debouncedSearchQuery]);

  // Paginate posts
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        image={seo.image}
        locale={locale}
      />
      <SchemaMarkup
        type="website"
        locale={locale}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog' }
        ]}
      />

      <div className={styles.pageWrapper}>
        {/* Hero Section */}
        <div className={heroStyles['hero-section']}>
          <div className={heroStyles['hero-wrapper']}>

            <div className={heroStyles['hero-content']}>
              <div className={heroStyles['hero-video']}>
                <div className={heroStyles['video-gradient-overlay']}></div>
                <video
                  className={heroStyles['hero-video-element']}
                  autoPlay
                  muted
                  loop
                  playsInline
                  key={isMobile ? 'mobile' : 'desktop'}
                >
                  <source src={isMobile ? hero.video_mobile : hero.video_desktop} type="video/mp4" />
                </video>
              </div>

              <h1 className={heroStyles['hero-title']}>
                <span>
                  {hero.title_line1}<em className='magenta'>{hero.title_line2_accent}</em>
                </span>
              </h1>
              <p className={heroStyles['hero-subtitle']}>
                {hero.subtitle}
              </p>
            </div>

          </div>
        </div>

        {/* Blog Posts Grid */}
        <section className={styles.blogSection}>
          <div className={styles.container}>

            {/* Search and Filters */}
            <BlogSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategories={selectedCategories}
              selectedTags={selectedTags}
              allCategories={allCategories}
              allTags={allTags}
              toggleCategory={toggleCategory}
              toggleTag={toggleTag}
              clearFilters={clearFilters}
              locale={locale}
            />

            {/* Results Count */}
            <div className={styles.resultsCount}>
              {t(locale, 'blog.showing')} {paginatedPosts.length} {t(locale, 'blog.of')} {filteredPosts.length} {filteredPosts.length !== 1 ? t(locale, 'blog.posts') : t(locale, 'blog.post')}
            </div>

            {paginatedPosts && paginatedPosts.length > 0 ? (
              <>
                <div className={styles.postsGrid}>
                  {paginatedPosts.map((post) => (
                  <article key={post.slug} className={styles.postCard}>
                    {post.featuredImage && (
                      <div className={styles.imageWrapper}>
                        <Link href={localePath(`/blog/${post.slug}`, locale)} className={styles.imageContainer}>
                          <Image
                            src={post.featuredImage}
                            alt={`Featured image for: ${post.title}`}
                            fill
                            className={styles.postImage}
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </Link>
                        {post.categories && post.categories.length > 0 && (
                          <div className={styles.categoriesOverlay}>
                            {post.categories.map((category, index) => (
                              <button
                                key={index}
                                className={`${styles.categoryBadgeOverlay} ${selectedCategories.includes(category) ? styles.active : ''}`}
                                onClick={() => toggleCategory(category)}
                              >
                                {category}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div className={styles.postContent}>

                      <Link href={localePath(`/blog/${post.slug}`, locale)}>
                        <h2 className={styles.postTitle}>{post.title}</h2>
                      </Link>

                      {post.date && (
                        <div className={styles.postMeta}>
                          <span className={styles.author}>{post.author}</span>
                          <span className={styles.separator}>•</span>
                          <span className={styles.date}>
                            {new Date(post.date).toLocaleDateString(t(locale, 'dateLocale'), {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}

                      <p className={styles.excerpt}>{post.excerpt}</p>

                      {post.tags && post.tags.length > 0 && (
                        <div className={styles.tagsSection}>
                          <span className={styles.tagsLabel}>{t(locale, 'blog.tags')}</span>
                          <div className={styles.tags}>
                            {post.tags.map((tag, index) => (
                              <button
                                key={index}
                                className={`${styles.tag} ${selectedTags.includes(tag) ? styles.active : ''}`}
                                onClick={() => toggleTag(tag)}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <Link href={localePath(`/blog/${post.slug}`, locale)} className={styles.readMore}>
                        {t(locale, 'blog.readMore')}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={styles.paginationButton}
                  >
                    {t(locale, 'blog.previous')}
                  </button>

                  <div className={styles.paginationPages}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`${styles.paginationPage} ${currentPage === page ? styles.active : ''}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={styles.paginationButton}
                  >
                    {t(locale, 'blog.next')}
                  </button>
                </div>
              )}
            </>
            ) : (
              <div className={styles.noPosts}>
                <p>{no_posts_message}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  const posts = loadBlogPosts(locale);
  const headerData = loadHeaderData(locale);
  const footerData = loadFooterData(locale);
  const pageData = loadPageData('blog', locale);

  return {
    props: {
      posts,
      headerData,
      footerData,
      pageData,
      locale
    }
  };
}

export default Blog;
