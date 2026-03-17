import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { t } from "../../libs/translations"
import { localePath } from "../../libs/routeMap"
import styles from "./WorkSamples.module.scss"
import useIsMobile from "../../hooks/useIsMobile"

export default function WorkSamples({ caseStudies = [], locale = 'en', content = {} }) {
  const [filter, setFilter] = useState("all")
  const isMobile = useIsMobile()

  const filteredSamples = filter === "featured" ? caseStudies.filter((sample) => sample.featured) : caseStudies

  return (
    <section className={styles.workSamplesSection} id="work-samples">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{content.title}</h2>

          <p className={styles.sectionDescription}>
            {content.description}
          </p>
        </div>

        {/* Updated grid to be 2 columns on desktop */}
        <div className={styles.projectGridTwoColumn}>
          {filteredSamples.map((sample) => (
            <Link key={sample.slug} href={localePath(`/work/${sample.slug}`, locale)} className={styles.projectCard}>
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

                {sample.featured && <span className={styles.featuredBadge}>{t(locale, 'common.featured')}</span>}

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
                    <span
                      onClick={(e) => { e.preventDefault(); window.open(sample.liveUrl, '_blank'); }}
                      className={styles.actionButton}
                      aria-label={`View ${sample.title} live site`}
                    >
                      <ExternalLink className={styles.iconSm} />
                    </span>
                  )}
                  {sample.githubUrl && (
                    <span
                      onClick={(e) => { e.preventDefault(); window.open(sample.githubUrl, '_blank'); }}
                      className={styles.actionButton}
                      aria-label={`View ${sample.title} source code`}
                    >
                      <Github className={styles.iconSm} />
                    </span>
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
                    <strong>{t(locale, 'common.impact')}</strong> {sample.impact}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            {content.cta_text}
          </p>
          <a href={localePath('/contact', locale)} className={styles.ctaButton}>
            {content.cta_button}
          </a>
        </div>
      </div>
    </section>
  )
}
