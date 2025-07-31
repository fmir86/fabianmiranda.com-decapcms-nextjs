import React, { useState, useEffect } from 'react';
import styles from './TechStackShowcase.module.scss';

const TechStackShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const techStack = {
    'Frontend': [
      { id: 'react', name: 'React', icon: 'react' },
      { id: 'vue', name: 'Vue', icon: 'vuedotjs' },
      { id: 'angular', name: 'Angular', icon: 'angular' },
      { id: 'svelte', name: 'Svelte', icon: 'svelte' }
    ],
    'Frameworks': [
      { id: 'nextjs', name: 'Next.js', icon: 'nextdotjs' },
      { id: 'nuxt', name: 'Nuxt', icon: 'nuxtdotjs' },
      { id: 'astro', name: 'Astro', icon: 'astro' }
    ],
    'CMS': [
      { id: 'wordpress', name: 'WordPress', icon: 'wordpress' },
      { id: 'strapi', name: 'Strapi', icon: 'strapi' },
      { id: 'tina', name: 'TinaCMS', icon: 'tinacms' },
      { id: 'decapcms', name: 'DecapCMS', icon: 'decapcms' },
      { id: 'contentful', name: 'Contentful', icon: 'contentful' }
    ],
    'Hosting': [
      { id: 'netlify', name: 'Netlify', icon: 'netlify' },
      { id: 'vercel', name: 'Vercel', icon: 'vercel' },
      { id: 'render', name: 'Render', icon: 'render' },
      { id: 'wpengine', name: 'WP Engine', icon: 'wpengine' },
      { id: 'pantheon', name: 'Pantheon', icon: 'pantheon' }
    ],
    'Tools': [
      { id: 'github', name: 'GitHub', icon: 'github' },
      { id: 'gitlab', name: 'GitLab', icon: 'gitlab' },
      { id: 'bitbucket', name: 'Bitbucket', icon: 'bitbucket' },
      { id: 'git', name: 'Git', icon: 'git' }
    ]
  };

  const allTechs = Object.values(techStack).flat();

  const getCategoryColor = (category) => {
    const colors = {
      'Frontend': '#00D4FF',
      'Frameworks': '#9945FF',
      'CMS': '#00FFA3',
      'Hosting': '#FF6B35',
      'Tools': '#E5E5E5'
    };
    return colors[category] || '#E5E5E5';
  };

  const getIconUrl = (iconName) => {
    // Using JSDelivr CDN for Simple Icons
    // Note: Some icons might not be available, in which case we'll use a fallback
    const baseUrl = 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/';
    
    // Handle special cases where icon names might differ
    const iconMap = {
      'tinacms': 'tina',
      'decapcms': 'netlify', // DecapCMS might not have its own icon yet, using Netlify as fallback
      'wpengine': 'wpengine',
      'pantheon': 'pantheon'
    };
    
    const mappedIcon = iconMap[iconName] || iconName;
    return `${baseUrl}${mappedIcon}.svg`;
  };

  const handleImageError = (e) => {
    // Fallback to a generic icon if the specific one isn't found
    e.target.style.display = 'none';
    e.target.parentElement.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" class="${styles.techIcon}">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6v6H9z" fill="#1a1a1a"/>
      </svg>
    `;
  };

  return (
    <div className={`${styles.techStackShowcase} ${isLoaded ? styles.loaded : ''}`}>
      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        <button 
          className={`${styles.filterTab} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          <span className={styles.tabText}>All Technologies</span>
          <span className={styles.tabCount}>{allTechs.length}</span>
        </button>
        {Object.keys(techStack).map(category => (
          <button
            key={category}
            className={`${styles.filterTab} ${activeFilter === category ? styles.active : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            <span className={styles.tabText}>{category}</span>
            <span className={styles.tabCount}>{techStack[category].length}</span>
          </button>
        ))}
      </div>
      
      {/* Tech Grid */}
      <div className={styles.techGrid}>
        {Object.entries(techStack).map(([category, techs]) => (
          techs.map((tech, index) => (
            <div 
              key={tech.id}
              className={`${styles.techItem} ${
                activeFilter === 'all' || activeFilter === category 
                  ? styles.visible 
                  : styles.hidden
              }`}
              style={{
                '--delay': `${index * 50}ms`,
                '--category-color': getCategoryColor(category)
              }}
            >
              <div className={styles.techCard}>
                <div className={styles.techIconWrapper}>
                  <img 
                    src={getIconUrl(tech.icon)} 
                    alt={tech.name}
                    className={styles.techIcon}
                    loading="lazy"
                    onError={handleImageError}
                  />
                </div>
                <span className={styles.techName}>{tech.name}</span>
                <span className={styles.techCategory}>{category}</span>
              </div>
            </div>
          ))
        ))}
      </div>

      {/* Floating Background Icons */}
      <div className={styles.floatingTechBg} aria-hidden="true">
        {allTechs.slice(0, 6).map((tech, index) => (
          <div
            key={`bg-${tech.id}`}
            className={styles.floatingIcon}
            style={{
              '--float-delay': `${index * 2}s`,
              '--float-duration': `${20 + index * 3}s`
            }}
          >
            <img 
              src={getIconUrl(tech.icon)} 
              alt=""
              className={styles.floatIconSvg}
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackShowcase;