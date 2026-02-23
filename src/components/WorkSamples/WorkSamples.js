import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import styles from "./WorkSamples.module.scss"
import useIsMobile from "../../hooks/useIsMobile"

export default function WorkSamples({ caseStudies = [] }) {
  const [filter, setFilter] = useState("all")
  const isMobile = useIsMobile()

  const filteredSamples = filter === "featured" ? caseStudies.filter((sample) => sample.featured) : caseStudies

  return (
    <section className={styles.workSamplesSection} id="work-samples">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Work That Drives Results</h2>
          
          <p className={styles.sectionDescription}>
            From startups to established businesses, I partner with visionary leaders to build technology 
            that scales, performs, and delivers measurable business impact.
          </p>
        </div>

        {/* Updated grid to be 2 columns on desktop */}
        <div className={styles.projectGridTwoColumn}>
          {filteredSamples.map((sample) => (
            <div key={sample.slug} className={styles.projectCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={sample.image}
                  alt={sample.title}
                  width={400}
                  height={267}
                  className={styles.projectImage}
                  style={{ width: '100%', height: 'auto' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={isMobile ? 50 : 100}
                />

                {sample.featured && <span className={styles.featuredBadge}>Featured</span>}

                {/* Tags overlaying the image at bottom left */}
                <div className={styles.tagsOverlay}>
                  {sample.tags.map((tag) => (
                    <span key={tag} className={styles.tagBadgeOverlay}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.actionButtons}>
                  {sample.liveUrl && (
                    <a 
                      href={sample.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.actionButton}
                      aria-label={`View ${sample.title} live site`}
                    >
                      <ExternalLink className={styles.iconSm} />
                    </a>
                  )}
                  {sample.githubUrl && (
                    <a 
                      href={sample.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.actionButton}
                      aria-label={`View ${sample.title} source code`}
                    >
                      <Github className={styles.iconSm} />
                    </a>
                  )}
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.projectTitle}>{sample.title}</h3>
                <p className={styles.projectDescription}>{sample.description}</p>

                {/* Show highlights - always visible */}
                {sample.highlights && (
                  <ul className={styles.highlightsList}>
                    {sample.highlights.map((highlight, index) => (
                      <li key={index} className={styles.highlightItem}>
                        <span className={styles.checkIcon}>◼</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Impact statement - always visible */}
                {sample.impact && (
                  <div className={styles.impactStatement}>
                    <strong>Impact:</strong> {sample.impact}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            Ready to transform your business with cutting-edge technology?
          </p>
          <a href="/contact" className={styles.ctaButton}>
            Let's Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  )
}
