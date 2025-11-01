"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import Layout from "../components/Layout/Layout"
import SEO from "../components/SEO/SEO"
import { loadCaseStudies } from "../libs/loadCaseStudies"
import { loadHeaderData, loadFooterData } from "../libs/loadGlobalData"
import { attributes } from '../../content/work.md'
import styles from "../components/WorkSamples/WorkSamples.module.scss"
import heroStyles from "../styles/About.module.scss"

const PROJECTS_PER_PAGE = 6;

const Work = ({ caseStudies, headerData, footerData }) => {
  const { title, description } = attributes;
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract all unique tags from case studies
  const allTags = useMemo(() => {
    const tagSet = new Set();
    caseStudies.forEach(study => {
      study.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [caseStudies]);

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
    setSelectedTags([]);
    setCurrentPage(1);
  };

  // Filter case studies by selected tags
  const filteredCaseStudies = useMemo(() => {
    if (selectedTags.length === 0) return caseStudies;
    return caseStudies.filter(study =>
      study.tags.some(tag => selectedTags.includes(tag))
    );
  }, [caseStudies, selectedTags]);

  // Paginate case studies
  const totalPages = Math.ceil(filteredCaseStudies.length / PROJECTS_PER_PAGE);
  const paginatedCaseStudies = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredCaseStudies.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [filteredCaseStudies, currentPage]);

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <SEO
        title={`${title} | Fabian Miranda - Creative Technologist`}
        description={description}
        image="/images/laptop-bg.jpg"
        type="website"
      />

      <div className="w-full">
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
                >
                  <source src="/video/work.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <h1 className={heroStyles['hero-title']}>
                Work That
                <span className="block">
                  <em className='magenta'>Drives Results</em>
                </span>
              </h1>
              <p className={heroStyles['hero-subtitle']}>
                A showcase of impactful projects that demonstrate technical excellence,
                creative problem-solving, and measurable business results.
              </p>
            </div>

          </div>
        </div>

        <section className={styles.workSamplesSection}>
          <div className={styles.container}>

            {/* Filters */}
            <div className={styles.filtersSection}>
              <div className={styles.filterHeader}>
                <h3 className={styles.filterTitle}>Filter Projects</h3>
                {selectedTags.length > 0 && (
                  <button onClick={clearFilters} className={styles.clearButton}>
                    Clear All Filters
                  </button>
                )}
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Technologies & Categories:</label>
                <div className={styles.filterOptions}>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`${styles.filterButton} ${selectedTags.includes(tag) ? styles.active : ''}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.resultsCount}>
                Showing {paginatedCaseStudies.length} of {filteredCaseStudies.length} project{filteredCaseStudies.length !== 1 ? 's' : ''}
                {selectedTags.length > 0 && (
                  <span className={styles.activeFilters}>
                    {' '}• Filters: {selectedTags.join(', ')}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.projectGridTwoColumn}>
              {paginatedCaseStudies.map((caseStudy) => (
                <div key={caseStudy.slug} className={`${styles.projectCard} group`}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      width={600}
                      height={400}
                      className={styles.projectImage}
                      style={{ width: '100%', height: 'auto' }}
                    />

                    {caseStudy.featured && <span className={styles.featuredBadge}>Featured</span>}

                    <div className={styles.tagsOverlay}>
                      {caseStudy.tags.map((tag) => (
                        <span key={tag} className={styles.tagBadgeOverlay}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={styles.actionButtons}>
                      {caseStudy.liveUrl && (
                        <a
                          href={caseStudy.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionButton}
                          aria-label={`View ${caseStudy.title} live site`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {caseStudy.githubUrl && (
                        <a
                          href={caseStudy.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionButton}
                          aria-label={`View ${caseStudy.title} source code`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className={styles.cardContent}>
                    <Link href={`/work/${caseStudy.slug}`}>
                      <h2 className={styles.projectTitle}>{caseStudy.title}</h2>
                    </Link>
                    <p className={styles.projectDescription}>{caseStudy.description}</p>

                    {caseStudy.highlights && caseStudy.highlights.length > 0 && (
                      <ul className={styles.highlightsList}>
                        {caseStudy.highlights.map((highlight, index) => (
                          <li key={index} className={styles.highlightItem}>
                            <span className={styles.checkIcon}>◼</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}

                    {caseStudy.impact && (
                      <div className={styles.impactStatement}>
                        <strong>Impact:</strong> {caseStudy.impact}
                      </div>
                    )}

                    <Link href={`/work/${caseStudy.slug}`} className={styles.viewCaseStudyBtn}>
                      View Case Study
                    </Link>
                  </div>
                </div>
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
                  Previous
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
                  Next
                </button>
              </div>
            )}

            <div className={styles.ctaSection}>
              <p className={styles.ctaText}>
                Ready to create something exceptional together?
              </p>
              <a href="/contact" className="lightblue-cta mx-auto">
                Start Your Project
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const caseStudies = loadCaseStudies();
  const headerData = loadHeaderData();
  const footerData = loadFooterData();

  return {
    props: {
      caseStudies,
      headerData,
      footerData
    }
  };
}

export default Work;