import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import useDebounce from '../../hooks/useDebounce';
import styles from './BlogSearch.module.scss';

const BlogSearch = ({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  selectedTags,
  allCategories,
  allTags,
  toggleCategory,
  toggleTag,
  clearFilters
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [searchResults, setSearchResults] = useState({ posts: [], categories: [], tags: [] });
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const debouncedQuery = useDebounce(searchQuery, 200);
  const hasActiveFilters = selectedCategories.length > 0 || selectedTags.length > 0 || searchQuery.length > 0;
  const hasSearchQuery = searchQuery.trim().length > 0;

  // Fetch search results from API
  useEffect(() => {
    const fetchResults = async () => {
      if (!isDropdownOpen) return;

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, isDropdownOpen]);

  // Handle dropdown open/close with animation
  useEffect(() => {
    if (isDropdownOpen) {
      setIsDropdownVisible(true);
      setIsClosing(false);
    } else if (isDropdownVisible) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsDropdownVisible(false);
        setIsClosing(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isDropdownOpen, isDropdownVisible]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key to close dropdown
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleClearAll = () => {
    clearFilters();
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  // Determine what to show in dropdown
  const showPosts = hasSearchQuery && searchResults.posts.length > 0;
  const showCategories = hasSearchQuery ? searchResults.categories.length > 0 : allCategories.length > 0;
  const showTags = hasSearchQuery ? searchResults.tags.length > 0 : allTags.length > 0;
  const categoriesToShow = hasSearchQuery ? searchResults.categories : allCategories;
  const tagsToShow = hasSearchQuery ? searchResults.tags : allTags;

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      {/* Search Input */}
      <div className={styles.searchInputWrapper}>
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search posts by title, content, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsDropdownOpen(false);
              inputRef.current?.blur();
            }
          }}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button
            className={styles.clearInputButton}
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isDropdownVisible && (
        <div className={`${styles.dropdown} ${isClosing ? styles.closing : styles.opening}`}>
          <button
            className={styles.dropdownClose}
            onClick={() => setIsDropdownOpen(false)}
            aria-label="Close filters"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {isLoading && (
            <div className={styles.loadingIndicator}>Searching...</div>
          )}

          {/* Matching Posts */}
          {showPosts && (
            <div className={styles.dropdownSection}>
              <span className={styles.dropdownLabel}>Articles</span>
              <div className={styles.postResults}>
                {searchResults.posts.map(post => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={styles.postResult}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <span className={styles.postResultTitle}>{post.title}</span>
                    {post.excerpt && (
                      <span className={styles.postResultExcerpt}>
                        {post.excerpt.substring(0, 80)}...
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {showCategories && (
            <div className={styles.dropdownSection}>
              <span className={styles.dropdownLabel}>
                {hasSearchQuery ? 'Matching Categories' : 'Categories'}
              </span>
              <div className={styles.dropdownOptions}>
                {categoriesToShow.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`${styles.dropdownPill} ${selectedCategories.includes(category) ? styles.active : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {showTags && (
            <div className={styles.dropdownSection}>
              <span className={styles.dropdownLabel}>
                {hasSearchQuery ? 'Matching Tags' : 'Tags'}
              </span>
              <div className={styles.dropdownOptions}>
                {tagsToShow.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`${styles.dropdownPill} ${selectedTags.includes(tag) ? styles.active : ''}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results message */}
          {hasSearchQuery && !showPosts && !showCategories && !showTags && !isLoading && (
            <div className={styles.noResults}>
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className={styles.activeFilters}>
          <div className={styles.activeFiltersList}>
            {selectedCategories.map(category => (
              <button
                key={`cat-${category}`}
                className={styles.activeFilterChip}
                onClick={() => toggleCategory(category)}
              >
                {category}
                <FontAwesomeIcon icon={faTimes} className={styles.chipRemoveIcon} />
              </button>
            ))}
            {selectedTags.map(tag => (
              <button
                key={`tag-${tag}`}
                className={styles.activeFilterChip}
                onClick={() => toggleTag(tag)}
              >
                {tag}
                <FontAwesomeIcon icon={faTimes} className={styles.chipRemoveIcon} />
              </button>
            ))}
          </div>
          <button className={styles.clearAllButton} onClick={handleClearAll}>
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogSearch;
