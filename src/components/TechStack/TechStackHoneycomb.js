import React, { useState, useEffect } from 'react';
import styles from './TechStackHoneycomb.module.scss';

const TechStackHoneycomb = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredTech, setHoveredTech] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Creating a proper interlocking honeycomb layout
  // Calculate offset for each hexagon
  const getHexPosition = (row, col) => {
    // Odd rows are offset by half the horizontal spacing
    const isOddRow = row % 2 === 1;
    // Horizontal spacing is (100px * 0.866) + 8px = 94.6px, so half is 47.3px
    const offset = isOddRow ? '47.3px' : '0px';
    return { row, col, offset };
  };

  const allTechs = [
    // Row 0 - 5 items
    { id: 'react', name: 'React', icon: 'react', category: 'Frontend', color: '#00D4FF', ...getHexPosition(0, 0) },
    { id: 'vue', name: 'Vue', icon: 'vuedotjs', category: 'Frontend', color: '#00D4FF', ...getHexPosition(0, 1) },
    { id: 'angular', name: 'Angular', icon: 'angular', category: 'Frontend', color: '#00D4FF', ...getHexPosition(0, 2) },
    { id: 'svelte', name: 'Svelte', icon: 'svelte', category: 'Frontend', color: '#00D4FF', ...getHexPosition(0, 3) },
    { id: 'hugo', name: 'Hugo', icon: 'hugo', category: 'Frontend', color: '#00D4FF', ...getHexPosition(0, 4) },
    
    // Row 1 - 5 items (offset)
    { id: 'nextjs', name: 'Next.js', icon: 'nextdotjs', category: 'Frameworks', color: '#9945FF', ...getHexPosition(1, 0) },
    { id: 'gatsby', name: 'Gatsby', icon: 'gatsby', category: 'Frameworks', color: '#9945FF', ...getHexPosition(1, 1) },
    { id: 'nuxt', name: 'Nuxt', icon: 'nuxtdotjs', category: 'Frameworks', color: '#9945FF', ...getHexPosition(1, 2) },
    { id: 'astro', name: 'Astro', icon: 'astro', category: 'Frameworks', color: '#9945FF', ...getHexPosition(1, 3) },
    
    // Row 2 - 4 items
    { id: 'wordpress', name: 'WordPress', icon: 'wordpress', category: 'CMS', color: '#00FFA3', ...getHexPosition(2, 0) },
    { id: 'strapi', name: 'Strapi', icon: 'strapi', category: 'CMS', color: '#00FFA3', ...getHexPosition(2, 1) },
    { id: 'tina', name: 'TinaCMS', icon: 'tinacms', category: 'CMS', color: '#00FFA3', ...getHexPosition(2, 2) },
    { id: 'decapcms', name: 'DecapCMS', icon: 'decapcms', category: 'CMS', color: '#00FFA3', ...getHexPosition(2, 3) },
    { id: 'contentful', name: 'Contentful', icon: 'contentful', category: 'CMS', color: '#00FFA3', ...getHexPosition(2, 4) },

    // Row 3 - 5 items (offset)
    { id: 'netlify', name: 'Netlify', icon: 'netlify', category: 'Hosting', color: '#FF6B35', ...getHexPosition(3, 0) },
    { id: 'vercel', name: 'Vercel', icon: 'vercel', category: 'Hosting', color: '#FF6B35', ...getHexPosition(3, 1) },
    { id: 'render', name: 'Render', icon: 'render', category: 'Hosting', color: '#FF6B35', ...getHexPosition(3, 2) },
    { id: 'wpengine', name: 'WP Engine', icon: 'wpengine', category: 'Hosting', color: '#FF6B35', ...getHexPosition(3, 3) },
    
    // Row 4 - 4 items
    { id: 'cloudflare', name: 'Cloudflare', icon: 'cloudflare', category: 'Hosting', color: '#FF6B35', ...getHexPosition(4, 0) },
    { id: 'aws', name: 'AWS', icon: 'amazonaws', category: 'Cloud', color: '#FF6B35', ...getHexPosition(4, 1) },
    { id: 'azure', name: 'Azure', icon: 'microsoftazure', category: 'Cloud', color: '#FF6B35', ...getHexPosition(4, 2) },
    { id: 'pantheon', name: 'Pantheon', icon: 'pantheon', category: 'Hosting', color: '#FF6B35', ...getHexPosition(4, 3) },
    
    // Row 5 - 4 items (offset)
    { id: 'git', name: 'Git', icon: 'git', category: 'Tools', color: '#E5E5E5', ...getHexPosition(5, 0) },
    { id: 'github', name: 'GitHub', icon: 'github', category: 'Tools', color: '#E5E5E5', ...getHexPosition(5, 1) },
    { id: 'bitbucket', name: 'Bitbucket', icon: 'bitbucket', category: 'Tools', color: '#E5E5E5', ...getHexPosition(5, 2) },
    { id: 'gitlab', name: 'GitLab', icon: 'gitlab', category: 'Tools', color: '#E5E5E5', ...getHexPosition(5, 3) }
  ];

  const getIconUrl = (iconName) => {
    const baseUrl = 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/';
    return `${baseUrl}${iconName}.svg`;
  };

  const handleImageError = (e, techName) => {
    e.target.style.display = 'none';
    // Get initials for fallback icon
    const initials = techName.split(/(?=[A-Z])/).map(word => word[0]).join('').substring(0, 2).toUpperCase();
    e.target.parentElement.innerHTML = `
      <div style="
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 18px;
        color: white;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
      ">${initials}</div>
    `;
  };

  return (
    <div className={`${styles.honeycombContainer} ${isLoaded ? styles.loaded : ''}`}>
      <div className={styles.honeycombGrid}>
        {allTechs.map((tech, index) => (
          <div
            key={tech.id}
            className={`${styles.hexagon} ${hoveredTech === tech.id ? styles.hovered : ''}`}
            style={{
              '--hex-color': tech.color,
              '--row': tech.row,
              '--col': tech.col,
              '--offset': tech.offset,
              '--delay': `${index * 50}ms`
            }}
            onMouseEnter={() => setHoveredTech(tech.id)}
            onMouseLeave={() => setHoveredTech(null)}
          >
            <div className={styles.hexagonInner}>
              <div className={styles.hexagonContent}>
                <img 
                  src={getIconUrl(tech.icon)} 
                  alt={tech.name}
                  className={styles.techIcon}
                  loading="lazy"
                  onError={(e) => handleImageError(e, tech.name)}
                />
                <span className={styles.techName}>{tech.name}</span>
              </div>

            </div>
            {/* SVG for hexagon shape */}
            <svg viewBox="0 0 100 100" className={styles.hexagonShape}>
              <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" />
            </svg>
          </div>
        ))}
      </div>

      {/* Subtle animated background */}
      <div className={styles.backgroundPattern} aria-hidden="true">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className={styles.floatingHex}
            style={{
              '--float-delay': `${i * 5}s`,
              '--float-x': `${30 + i * 30}%`,
              '--float-y': `${20 + i * 25}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TechStackHoneycomb;