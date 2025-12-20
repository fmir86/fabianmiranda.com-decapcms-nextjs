import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import Layout from "../../components/Layout/Layout"
import SEO from "../../components/SEO/SEO"
import SchemaMarkup from "../../components/SEO/SchemaMarkup"
import ShareButtons from "../../components/ShareButtons/ShareButtons"
import { loadCaseStudies } from "../../libs/loadCaseStudies"
import { loadHeaderData, loadFooterData } from "../../libs/loadGlobalData"
import ReactMarkdown from 'react-markdown'
import styles from "./CaseStudy.module.scss"
import useIsMobile from "../../hooks/useIsMobile"

const CaseStudy = ({ caseStudy, headerData, footerData }) => {
  const isMobile = useIsMobile();

  if (!caseStudy) {
    return <div>Case study not found</div>;
  }

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <SEO
        title={`${caseStudy.title} | Fabian Miranda`}
        description={caseStudy.description}
        image={caseStudy.image || '/images/og-default-v2.jpg'}
        type="article"
        keywords={caseStudy.tags?.join(', ')}
      />
      <SchemaMarkup
        type="caseStudy"
        caseStudy={{
          title: caseStudy.title,
          description: caseStudy.description,
          slug: caseStudy.slug,
          date: caseStudy.date,
          image: caseStudy.image,
          tags: caseStudy.tags,
          liveUrl: caseStudy.liveUrl
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Work', url: '/work' },
          { name: caseStudy.title }
        ]}
      />

      <article className={styles.caseStudyContainer}>
        {/* Back Button */}
        <div className={styles.backButton}>
          <Link href="/work" className="flex items-center gap-2 text-lightblue hover:text-magenta transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Work
          </Link>
        </div>

        {/* Hero Section */}
        <header className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{caseStudy.title}</h1>

            {caseStudy.date && (
              <p className={styles.date}>{new Date(caseStudy.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
            )}

            {/* Tags */}
            {caseStudy.tags && caseStudy.tags.length > 0 && (
              <div className={styles.tags}>
                {caseStudy.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className={styles.actions}>
              {caseStudy.liveUrl && (
                <a
                  href={caseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionButton}
                >
                  <ExternalLink className="h-5 w-5" />
                  View Live Site
                </a>
              )}
              {caseStudy.githubUrl && (
                <a
                  href={caseStudy.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionButton}
                >
                  <Github className="h-5 w-5" />
                  View Source
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {caseStudy.image && (
          <div className={styles.featuredImage}>
            <Image
              src={caseStudy.image}
              alt={`Project screenshot: ${caseStudy.title}`}
              width={800}
              height={400}
              className={styles.image}
              style={{ width: '100%', height: 'auto' }}
              sizes="(max-width: 768px) 100vw, 800px"
              priority
              quality={isMobile ? 50 : 100}
            />
          </div>
        )}

        {/* Overview Section */}
        <section className={styles.overview}>
          <div className={styles.metadataGrid}>
            <div className={styles.metadataBox}>
              <h2>Overview</h2>
              <p className={styles.description}>{caseStudy.description}</p>
            </div>

            {/* Highlights Grid */}
            {caseStudy.highlights && caseStudy.highlights.length > 0 && (
              <div className={styles.metadataBox}>
                <h3>Key Highlights</h3>
                <ul className={styles.highlightsList}>
                  {caseStudy.highlights.map((highlight, index) => (
                    <li key={index} className={styles.highlightItem}>
                      <span className={styles.bullet}>◼</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Impact Statement */}
            {caseStudy.impact && (
              <div className={`${styles.metadataBox} ${styles.impactBox}`}>
                <h3>Impact</h3>
                <p>{caseStudy.impact}</p>
              </div>
            )}
          </div>
        </section>

        {/* Share Buttons */}
        <ShareButtons
          url={`/work/${caseStudy.slug}`}
          title={caseStudy.title}
          description={caseStudy.description}
        />

        {/* Full Case Study Content */}
        {caseStudy.content && (
          <section className={styles.content}>
            <ReactMarkdown>{caseStudy.content}</ReactMarkdown>
          </section>
        )}

        {/* CTA Section */}
        <section className={styles.cta}>
          <h2>Ready to start your project?</h2>
          <p>Let's discuss how I can help bring your vision to life.</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className="lightblue-cta">
              Get In Touch
            </Link>
            <Link href="/work" className={styles.secondaryButton}>
              View More Work
            </Link>
          </div>
        </section>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const caseStudies = loadCaseStudies();

  const paths = caseStudies.map((study) => ({
    params: { slug: study.slug }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const caseStudies = loadCaseStudies();
  const caseStudy = caseStudies.find(study => study.slug === params.slug);
  const headerData = loadHeaderData();
  const footerData = loadFooterData();

  if (!caseStudy) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      caseStudy,
      headerData,
      footerData
    }
  };
}

export default CaseStudy;
