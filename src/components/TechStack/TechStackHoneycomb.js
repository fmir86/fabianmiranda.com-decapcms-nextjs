import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './TechStackHoneycomb.module.scss';

const TechStackHoneycomb = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [autoAnimatedTech, setAutoAnimatedTech] = useState(null);
  const animationTimeoutRef = useRef(null);
  const isUserHovering = useRef(false);

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
    // Row 0 - 5 items (programming languages)
    { id: 'python', name: 'Python', icon: 'python', category: 'Languages', color: '#FFD700', ...getHexPosition(0, 1) },
    { id: 'javascript', name: 'JavaScript', icon: 'javascript', category: 'Languages', color: '#FFD700', ...getHexPosition(0, 2) },
    { id: 'typescript', name: 'TypeScript', icon: 'typescript', category: 'Languages', color: '#FFD700', ...getHexPosition(0, 3) },
    { id: 'nodejs', name: 'Node.js', icon: 'nodedotjs', category: 'Languages', color: '#FFD700', ...getHexPosition(0, 4) },
    { id: 'php', name: 'PHP', icon: 'php', category: 'Languages', color: '#FFD700', ...getHexPosition(0, 5) },
    // Row 1 - 6 items (offset)
    { id: 'react', name: 'React', icon: 'react', category: 'Frontend', color: '#00D4FF', ...getHexPosition(1, 0) },
    { id: 'vue', name: 'Vue', icon: 'vuedotjs', category: 'Frontend', color: '#00D4FF', ...getHexPosition(1, 1) },
    { id: 'angular', name: 'Angular', icon: 'angular', category: 'Frontend', color: '#00D4FF', ...getHexPosition(1, 2) },
    { id: 'svelte', name: 'Svelte', icon: 'svelte', category: 'Frontend', color: '#00D4FF', ...getHexPosition(1, 3) },
    { id: 'jekyll', name: 'Jekyll', icon: 'jekyll', category: 'Frameworks', color: '#9945FF', ...getHexPosition(1, 4) },
    { id: 'nextjs', name: 'Next.js', icon: 'nextdotjs', category: 'Frameworks', color: '#9945FF', ...getHexPosition(1, 5) },

    // Row 2 - 5 items
    { id: 'gatsby', name: 'Gatsby', icon: 'gatsby', category: 'Frameworks', color: '#9945FF', ...getHexPosition(2, 1) },
    { id: 'nuxt', name: 'Nuxt', icon: 'nuxtdotjs', category: 'Frameworks', color: '#9945FF', ...getHexPosition(2, 2) },
    { id: 'astro', name: 'Astro', icon: 'astro', category: 'Frameworks', color: '#9945FF', ...getHexPosition(2, 3) },
    { id: 'hugo', name: 'Hugo', icon: 'hugo', category: 'Frontend', color: '#00D4FF', ...getHexPosition(2, 4) },
    { id: 'wordpress', name: 'WordPress', icon: 'wordpress', category: 'CMS', color: '#00FFA3', ...getHexPosition(2, 5) },
    
    // Row 3 - 6 items (offset)
    { id: 'strapi', name: 'Strapi', icon: 'strapi', category: 'CMS', color: '#00FFA3', ...getHexPosition(3, 0) },
    { id: 'tina', name: 'TinaCMS', icon: 'tina', category: 'CMS', color: '#00FFA3', ...getHexPosition(3, 1) },
    { id: 'decapcms', name: 'DecapCMS', icon: 'decapcms', category: 'CMS', color: '#00FFA3', ...getHexPosition(3, 2) },
    { id: 'contentful', name: 'Contentful', icon: 'contentful', category: 'CMS', color: '#00FFA3', ...getHexPosition(3, 3) },
    { id: 'netlify', name: 'Netlify', icon: 'netlify', category: 'Hosting', color: '#FF6B35', ...getHexPosition(3, 4) },
    { id: 'vercel', name: 'Vercel', icon: 'vercel', category: 'Hosting', color: '#FF6B35', ...getHexPosition(3, 5) },

    // Row 4 - 5 items
    { id: 'render', name: 'Render', icon: 'render', category: 'Hosting', color: '#FF6B35', ...getHexPosition(4, 1) },
    { id: 'wpengine', name: 'WP Engine', icon: 'wpengine', category: 'Hosting', color: '#FF6B35', ...getHexPosition(4, 2) },
    { id: 'railway', name: 'Railway', icon: 'railway', category: 'Hosting', color: '#FF6B35', ...getHexPosition(4, 3) },
    { id: 'pantheon', name: 'Pantheon', icon: 'pantheon', category: 'Hosting', color: '#FF6B35', ...getHexPosition(4, 4) },
    { id: 'googlecloud', name: 'Google Cloud', icon: 'googlecloud', category: 'Hosting', color: '#FF6B35', ...getHexPosition(4, 5) },

    // Row 5 - 6 items (offset)
    { id: 'cloudflare', name: 'Cloudflare', icon: 'cloudflare', category: 'Hosting', color: '#FF6B35', ...getHexPosition(5, 0) },
    { id: 'aws', name: 'AWS', icon: 'amazonaws', category: 'Cloud', color: '#FF6B35', ...getHexPosition(5, 1) },
    { id: 'azure', name: 'Azure', icon: 'microsoftazure', category: 'Cloud', color: '#FF6B35', ...getHexPosition(5, 2) },
    { id: 'git', name: 'Git', icon: 'git', category: 'Tools', color: '#E5E5E5', ...getHexPosition(5, 3) },
    { id: 'github', name: 'GitHub', icon: 'github', category: 'Tools', color: '#E5E5E5', ...getHexPosition(5, 4) },
    { id: 'bitbucket', name: 'Bitbucket', icon: 'bitbucket', category: 'Tools', color: '#E5E5E5', ...getHexPosition(5, 5) },

    // Row 6 - 7 items
    { id: 'gitlab', name: 'GitLab', icon: 'gitlab', category: 'Tools', color: '#E5E5E5', ...getHexPosition(6, 0) },    
    { id: 'mariadb', name: 'MariaDB', icon: 'mariadb', category: 'Database', color: '#00CED1', ...getHexPosition(6, 1) },
    { id: 'mysql', name: 'MySQL', icon: 'mysql', category: 'Database', color: '#00CED1', ...getHexPosition(6, 2) },
    { id: 'postgresql', name: 'PostgreSQL', icon: 'postgresql', category: 'Database', color: '#00CED1', ...getHexPosition(6, 3) },
    { id: 'mongodb', name: 'MongoDB', icon: 'mongodb', category: 'Database', color: '#00CED1', ...getHexPosition(6, 4) },
    { id: 'fauna', name: 'Fauna', icon: 'fauna', category: 'Database', color: '#00CED1', ...getHexPosition(6, 5) },
    { id: 'sqlite', name: 'SQLite', icon: 'sqlite', category: 'Database', color: '#00CED1', ...getHexPosition(6, 6) }
  ];

  // Function to find adjacent hexagons
  const getAdjacentHexagons = (tech) => {
    const { row, col } = tech;
    const adjacentPositions = [];
    
    // In a honeycomb grid, the neighbors depend on whether we're in an even or odd row
    const isOddRow = row % 2 === 1;
    
    if (isOddRow) {
      // Odd row neighbors
      adjacentPositions.push(
        { row: row - 1, col: col },      // Top left
        { row: row - 1, col: col + 1 },  // Top right
        { row: row, col: col - 1 },      // Left
        { row: row, col: col + 1 },      // Right
        { row: row + 1, col: col },      // Bottom left
        { row: row + 1, col: col + 1 }   // Bottom right
      );
    } else {
      // Even row neighbors
      adjacentPositions.push(
        { row: row - 1, col: col - 1 },  // Top left
        { row: row - 1, col: col },      // Top right
        { row: row, col: col - 1 },      // Left
        { row: row, col: col + 1 },      // Right
        { row: row + 1, col: col - 1 },  // Bottom left
        { row: row + 1, col: col }       // Bottom right
      );
    }
    
    // Filter to find actual existing hexagons
    const adjacentTechs = adjacentPositions
      .map(pos => allTechs.find(t => t.row === pos.row && t.col === pos.col))
      .filter(t => t !== undefined);
    
    return adjacentTechs;
  };

  // Main animation effect
  useEffect(() => {
    const runAnimation = () => {
      if (!isUserHovering.current) {
        setAutoAnimatedTech(current => {
          if (!current) {
            // Start with a random hexagon
            const randomIndex = Math.floor(Math.random() * allTechs.length);
            return allTechs[randomIndex].id;
          } else {
            // Find current tech and move to adjacent
            const currentTech = allTechs.find(t => t.id === current);
            if (currentTech) {
              const adjacentTechs = getAdjacentHexagons(currentTech);
              if (adjacentTechs.length > 0) {
                const randomAdjacent = adjacentTechs[Math.floor(Math.random() * adjacentTechs.length)];
                return randomAdjacent.id;
              }
            }
            // If no adjacent found, start over
            const randomIndex = Math.floor(Math.random() * allTechs.length);
            return allTechs[randomIndex].id;
          }
        });
      }
    };

    // Start animation after component loads
    if (isLoaded) {
      // Initial delay
      const startTimeout = setTimeout(() => {
        runAnimation();
        // Then run every 2 seconds
        const interval = setInterval(runAnimation, 2000);
        animationTimeoutRef.current = interval;
      }, 1000);

      return () => {
        clearTimeout(startTimeout);
        if (animationTimeoutRef.current) {
          clearInterval(animationTimeoutRef.current);
        }
      };
    }
  }, [isLoaded]);

  // Handle user hover
  const handleMouseEnter = (techId) => {
    isUserHovering.current = true;
    setHoveredTech(techId);
    setAutoAnimatedTech(null);
  };

  const handleMouseLeave = () => {
    isUserHovering.current = false;
    setHoveredTech(null);
  };

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
            className={`${styles.hexagon} ${
              hoveredTech === tech.id || autoAnimatedTech === tech.id ? styles.hovered : ''
            }`}
            style={{
              '--hex-color': tech.color,
              '--row': tech.row,
              '--col': tech.col,
              '--offset': tech.offset,
              '--delay': `${index * 50}ms`
            }}
            onMouseEnter={() => handleMouseEnter(tech.id)}
            onMouseLeave={handleMouseLeave}
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