import React, { useState } from 'react';
import TechStackShowcase from './TechStackShowcase';
import TechStackHoneycomb from './TechStackHoneycomb';
import styles from './TechStackToggle.module.scss';

const TechStackToggle = () => {
  const [view, setView] = useState('honeycomb'); // 'showcase' or 'honeycomb'

  return (
    <div className={styles.container}>
      {/* View Toggle */}
      <div className={styles.viewToggle}>
        <button
          className={`${styles.toggleBtn} ${view === 'showcase' ? styles.active : ''}`}
          onClick={() => setView('showcase')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
          Grid View
        </button>
        <button
          className={`${styles.toggleBtn} ${view === 'honeycomb' ? styles.active : ''}`}
          onClick={() => setView('honeycomb')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2l6 3.5v7L14 16l-6-3.5v-7L14 2z" />
            <path d="M8 12.5l6 3.5" />
            <path d="M14 16V9" />
            <path d="M20 12.5l-6-3.5" />
          </svg>
          Honeycomb View
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {view === 'showcase' ? <TechStackShowcase /> : <TechStackHoneycomb />}
      </div>
    </div>
  );
};

export default TechStackToggle;