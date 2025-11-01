"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import styles from "./WorkSamples.module.scss"

export default function WorkSamples({ caseStudies = [] }) {
  const [filter, setFilter] = useState("all")

  const filteredSamples = filter === "featured" ? caseStudies.filter((sample) => sample.featured) : caseStudies

  return (
    <section className={styles.workSamplesSection} id="work-samples">
      <div className={styles.container}>
        <div className="text-center mb-12">
          <h2 className={styles.sectionTitle}>Work That Drives Results</h2>
          
          <p className={styles.sectionDescription}>
            From startups to established businesses, I partner with visionary leaders to build technology 
            that scales, performs, and delivers measurable business impact.
          </p>
        </div>

        {/* Updated grid to be 2 columns on desktop */}
        <div className={styles.projectGridTwoColumn}>
          {filteredSamples.map((sample) => (
            <div key={sample.slug} className={`${styles.projectCard} group`}>
              <div className={styles.imageContainer}>
                <Image
                  src={sample.image}
                  alt={sample.title}
                  width={600}
                  height={400}
                  className={styles.projectImage}
                  style={{ width: '100%', height: 'auto' }}
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
                      <ExternalLink className="h-4 w-4" />
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
                      <Github className="h-4 w-4" />
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
          <a href="/contact" className="lightblue-cta mx-auto">
            Let's Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  )
}
