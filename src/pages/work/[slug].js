import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import Layout from "../../components/Layout/Layout"
import SEO from "../../components/SEO/SEO"
import SchemaMarkup from "../../components/SEO/SchemaMarkup"
import ShareButtons from "../../components/ShareButtons/ShareButtons"
import { loadCaseStudies } from "../../libs/loadCaseStudies"
import { loadHeaderData, loadFooterData } from "../../libs/loadGlobalData"
import { t } from "../../libs/translations"
import { localePath } from "../../libs/routeMap"
import ReactMarkdown from 'react-markdown'
import styles from "./CaseStudy.module.scss"
import useIsMobile from "../../hooks/useIsMobile"

const CaseStudy = ({ caseStudy, headerData, footerData, locale, alternateSlug }) => {
  const isMobile = useIsMobile();

  if (!caseStudy) {
    return <div>Case study not found</div>;
  }

  return (
    <Layout headerData={headerData} footerData={footerData} alternateSlug={alternateSlug}>
      <SEO
        title={`${caseStudy.title} | Fabian Miranda`}
        description={caseStudy.description}
        image={caseStudy.image || '/images/og-default-v2.jpg'}
        type="article"
        keywords={caseStudy.tags?.join(', ')}
        locale={locale}
        alternateSlug={alternateSlug}
        publishedTime={caseStudy.date}
        tags={caseStudy.tags || []}
      />
      <SchemaMarkup
        type="caseStudy"
        locale={locale}
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
          <Link href={localePath('/work', locale)} className="flex items-center gap-2 text-lightblue hover:text-magenta transition-colors">
            <ArrowLeft className="h-4 w-4" />
            {t(locale, 'workDetail.backToWork')}
          </Link>
        </div>

        {/* Hero Section */}
        <header className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{caseStudy.title}</h1>

            {caseStudy.date && (
              <p className={styles.date}>{new Date(caseStudy.date).toLocaleDateString(t(locale, 'dateLocale'), { year: 'numeric', month: 'long' })}</p>
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

          </div>
        </header>

        {/* Share Buttons */}
        <ShareButtons
          url={localePath(`/work/${caseStudy.slug}`, locale)}
          title={caseStudy.title}
          description={caseStudy.description}
          locale={locale}
        />

        {/* Featured Image with Action Buttons overlay */}
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
            <div className={styles.actions}>
              {caseStudy.liveUrl && (
                <a
                  href={caseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionButton}
                >
                  <ExternalLink className="h-5 w-5" />
                  {t(locale, 'workDetail.viewLiveSite')}
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
                  {t(locale, 'workDetail.viewSource')}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Overview Section */}
        <section className={styles.overview}>
          <div className={styles.metadataGrid}>
            <div className={styles.metadataBox}>
              <h2>{t(locale, 'workDetail.overview')}</h2>
              <p className={styles.description}>{caseStudy.description}</p>
            </div>

            {/* Highlights Grid */}
            {caseStudy.highlights && caseStudy.highlights.length > 0 && (
              <div className={styles.metadataBox}>
                <h3>{t(locale, 'workDetail.keyHighlights')}</h3>
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
                <h3>{t(locale, 'workDetail.impact')}</h3>
                <p>{caseStudy.impact}</p>
              </div>
            )}
          </div>
        </section>

        {/* Full Case Study Content */}
        {caseStudy.content && (
          <section className={styles.content}>
            <ReactMarkdown>{caseStudy.content}</ReactMarkdown>
          </section>
        )}

        {/* CTA Section */}
        <section className={styles.cta}>
          <h2>{t(locale, 'workDetail.readyToStart')}</h2>
          <p>{t(locale, 'workDetail.letsDiscuss')}</p>
          <div className={styles.ctaButtons}>
            <Link href={localePath('/contact', locale)} className="lightblue-cta">
              {t(locale, 'workDetail.getInTouch')}
            </Link>
            <Link href={localePath('/work', locale)} className={styles.secondaryButton}>
              {t(locale, 'workDetail.viewMoreWork')}
            </Link>
          </div>
        </section>
      </article>
    </Layout>
  )
}

export async function getStaticPaths({ locales }) {
  const paths = [];
  for (const locale of locales) {
    const caseStudies = loadCaseStudies(locale);
    caseStudies.forEach(study => {
      paths.push({ params: { slug: study.slug }, locale });
    });
  }

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params, locale }) {
  const caseStudies = loadCaseStudies(locale);
  const caseStudy = caseStudies.find(study => study.slug === params.slug);
  const headerData = loadHeaderData(locale);
  const footerData = loadFooterData(locale);

  if (!caseStudy) {
    return {
      notFound: true
    };
  }

  // Find the alternate locale slug for language switcher + hreflang
  const altLocale = locale === 'en' ? 'es' : 'en';
  const altStudies = loadCaseStudies(altLocale);
  const altStudy = altStudies.find(s => s.filename === caseStudy.filename);
  const alternateSlug = altStudy?.slug || caseStudy.slug;

  return {
    props: {
      caseStudy,
      headerData,
      footerData,
      locale,
      alternateSlug
    }
  };
}

export default CaseStudy;
