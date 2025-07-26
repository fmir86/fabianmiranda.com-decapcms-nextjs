"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import styles from "./WorkSamples.module.scss"

const workSamples = [
  {
    id: 1,
    title: "Contabilidad Costa Rica",
    description: "Engineered a high-performance digital platform for Costa Rica's leading accounting firm, transforming their client acquisition strategy. This modern web application showcases financial services with compelling UX design, resulting in a 150% increase in qualified leads and establishing their position as the go-to digital-first accounting solution for SMEs and international businesses operating in Costa Rica.",
    image: "/images/work-samples/contabilidad-costarica-cover.jpg",
    tags: ["Next.js", "TailwindCSS", "JavaScript", "Vercel"],
    liveUrl: "https://contabilidadcostarica.net",
    highlights: [
      "Sub-second page loads with Next.js optimization",
      "SEO-optimized architecture ranking #1 for key terms",
      "Conversion-focused design with strategic CTAs"
    ],
    impact: "Transformed a traditional accounting firm into a digital powerhouse, capturing 40% of online accounting inquiries in the region."
  },
  {
    id: 2,
    title: "Ayahuasca Costa Rica",
    description: "Developed a comprehensive wellness platform connecting spiritual seekers with authentic ayahuasca retreats. Built with robust content management capabilities, multi-language support, and an intuitive booking system that handles complex retreat scheduling. The platform serves as the primary digital gateway for international visitors seeking transformative experiences in Costa Rica.",
    image: "/images/work-samples/ayahuasca-costa-rica-cover.jpg",
    tags: ["WordPress", "PHP", "MySQL", "Siteground"],
    liveUrl: "https://ayahuascacostarica.org",
    highlights: [
      "Custom booking system handling 500+ monthly inquiries",
      "Multi-language architecture serving 5 languages",
      "Integrated payment gateway with international support"
    ],
    impact: "Established the definitive online presence for ayahuasca tourism in Costa Rica, facilitating over $2M in annual retreat bookings."
  },
  {
    id: 3,
    title: "Mario Miranda Tours",
    description: "Architected a lightning-fast, modern web experience for an eco-tourism operator specializing in authentic Costa Rican adventures. Leveraging Astro's innovative island architecture, the site delivers exceptional performance while showcasing immersive tour experiences through dynamic galleries and interactive itineraries. The platform integrates real-time availability checking and seamless booking workflows.",
    image: "/images/work-samples/mariomirandatours-cover.jpg",
    tags: ["Astro", "TypeScript", "TailwindCSS", "Netlify"],
    liveUrl: "https://mariomirandatours.com",
    highlights: [
      "100/100 Lighthouse performance score",
      "Static site generation with dynamic components",
      "Mobile-first design increasing bookings by 200%"
    ],
    impact: "Revolutionized online presence for boutique tour operator, achieving 3x increase in direct bookings and reducing dependency on third-party platforms."
  },
  {
    id: 4,
    title: "Sibu Wellness",
    description: "Crafted a sophisticated digital sanctuary for a premium wellness center, seamlessly blending elegant design with powerful functionality. This WordPress-powered platform features advanced scheduling integration, practitioner profiles, and a comprehensive wellness resource library. The site serves as both a booking platform and educational hub, positioning Sibu as the premier destination for holistic health in Central America.",
    image: "/images/work-samples/sibu-cover.jpg",
    tags: ["WordPress", "PHP", "MySQL", "Siteground"],
    liveUrl: "https://sibuwellness.com",
    highlights: [
      "Custom wellness program builder with personalization",
      "Integrated CRM for patient journey tracking",
      "Resource library with 200+ wellness articles"
    ],
    impact: "Elevated a local wellness center to international recognition, attracting clients from 30+ countries and increasing revenue by 250%."
  }
]

export default function WorkSamples() {
  const [filter, setFilter] = useState("all")

  const filteredSamples = filter === "featured" ? workSamples.filter((sample) => sample.featured) : workSamples

  return (
    <section className={styles.workSamplesSection}>
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
            <div key={sample.id} className={`${styles.projectCard} group`}>
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
