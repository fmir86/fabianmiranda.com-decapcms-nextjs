import Head from "next/head"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import Layout from "../components/Layout/Layout"
import { loadCaseStudies } from "../libs/loadCaseStudies"
import { attributes } from '../../content/portfolio.md'
import styles from "../components/WorkSamples/WorkSamples.module.scss"

const Portfolio = ({ caseStudies }) => {
  const { title, description } = attributes;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="w-full">
        <section className={styles.workSamplesSection}>
          <div className={styles.container}>
            <div className="text-center mb-12">
              <h1 className={styles.sectionTitle}>Portfolio</h1>
              <p className={styles.sectionDescription}>
                A showcase of impactful projects that demonstrate technical excellence,
                creative problem-solving, and measurable business results.
              </p>
            </div>

            <div className={styles.projectGridTwoColumn}>
              {caseStudies.map((caseStudy) => (
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
                    <h2 className={styles.projectTitle}>{caseStudy.title}</h2>
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
                  </div>
                </div>
              ))}
            </div>

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

  return {
    props: {
      caseStudies
    }
  };
}

export default Portfolio;