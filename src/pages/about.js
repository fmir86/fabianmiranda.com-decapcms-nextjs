import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/SEO";
import SchemaMarkup from "../components/SEO/SchemaMarkup";
import Image from 'next/image';
import styles from '../styles/About.module.scss';
import TechStackHoneycomb from '../components/TechStack/TechStackHoneycomb';
import BannerCTA from '../components/BannerCTA';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resolveFaIcon } from '../libs/iconMap';
import HtmlContent from "../components/HtmlContent/HtmlContent";
import { loadHeaderData, loadFooterData } from "../libs/loadGlobalData";
import { loadPageData } from "../libs/loadPageData";
import useIsMobile from "../hooks/useIsMobile";

const About = ({ headerData, footerData, pageData, locale }) => {
  const isMobile = useIsMobile();
  const { seo, hero, journey, expertise, current_focus, costa_rica, banner_cta } = pageData;

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <SEO
        title={seo.title}
        description={seo.description}
        image={seo.image}
        keywords={seo.keywords}
        locale={locale}
      />
      <SchemaMarkup
        type="about"
        locale={locale}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About' }
        ]}
      />

      <div className={styles['page-wrapper']}>
        {/* Hero Section */}
        <div className={styles['hero-section']}>
          <div className={styles['hero-wrapper']}>

            <div className={styles['hero-content']}>

              <div className={styles['hero-video']}>
                <div className={styles['video-gradient-overlay']}></div>
                <video
                  className={styles['hero-video-element']}
                  autoPlay
                  muted
                  playsInline
                  key={isMobile ? 'mobile-banner' : 'desktop-banner'}
                >
                  <source src={isMobile ? hero.video_mobile : hero.video_desktop} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <h1 className={styles['hero-title']}>
                {hero.title_line1}
                <span>
                  <em className='magenta'>{hero.title_line2_magenta}</em><br/>
                  <em className='lightblue'>{hero.title_line2_lightblue}</em>
                </span>
              </h1>
              <p className={styles['hero-subtitle']}>
                {hero.subtitle}
              </p>
            </div>

          </div>
        </div>

        {/* Journey Section */}
        <div className={styles['journey-section']}>
          <div className={styles['container']}>
            <h2>{journey.title}</h2>
            <div className={styles['timeline']}>
              {journey.items.map((item, index) => (
                <div key={index} className={styles['timeline-item']}>
                  <div className={styles['timeline-marker']}></div>
                  <div className={styles['timeline-content']}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expertise Grid */}
        <div className={styles['expertise-section']}>
          <div className={styles['container']}>
            <h2>{expertise.title}</h2>
            <div className={styles['expertise-grid']}>
              {expertise.items.map((item, index) => (
                <div key={index} className={styles['expertise-card']}>
                  <div className={styles['card-content']}>
                    <div className={styles['card-icon']}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" dangerouslySetInnerHTML={{ __html: item.svg }} />
                    </div>
                    <h3>{item.title}</h3>
                    <HtmlContent html={item.description} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Focus */}
        <div className={styles['focus-section']}>
          {/* Background Video */}
          <div className={styles['focus-video-bg']}>
            <video
              className={styles['focus-video-element']}
              autoPlay
              muted
              loop
              playsInline
              key={isMobile ? 'mobile-circuits' : 'desktop-circuits'}
            >
              <source src={isMobile ? current_focus.video_mobile : current_focus.video_desktop} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={styles['container']}>
            <div className={styles['focus-content']}>
              <div className={styles['focus-text']}>
                <h2>{current_focus.title}</h2>
                <p className={styles['focus-intro']}>
                  {current_focus.intro}
                </p>
                <ul className={styles['focus-list']}>
                  {current_focus.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className={styles['focus-intro']}>
                  {current_focus.outro}
                </p>
              </div>
              <div className={styles['focus-image']}>
                <TechStackHoneycomb />
              </div>
            </div>
          </div>
        </div>

        {/* Costa Rica Connection */}
        <div className={styles['location-section']}>
          <div className={styles['container']}>
            <div className={styles['location-content']}>
              <div className={styles['location-image']}>
                <Image
                  src={costa_rica.image.src}
                  alt={costa_rica.image.alt}
                  width={600}
                  height={400}
                  className={styles['location-photo']}
                />
              </div>
              <div className={styles['location-text']}>
                <h2>{costa_rica.title}</h2>
                {costa_rica.intro.map((paragraph, index) => (
                  <HtmlContent key={index} html={paragraph} className={styles['location-intro']} />
                ))}
                <div className={styles['location-benefits']}>
                  {costa_rica.benefits.map((benefit, index) => {
                    const faIcon = resolveFaIcon(benefit.icon);
                    return (
                      <div key={index} className={styles['benefit']}>
                        <div className={styles['benefit-icon']}>
                          {faIcon && <FontAwesomeIcon icon={faIcon} size="1x" />}
                        </div>
                        <h4 dangerouslySetInnerHTML={{ __html: benefit.title }} />
                        <p>{benefit.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <BannerCTA
          title={banner_cta.title}
          description={banner_cta.description}
          primaryCta={banner_cta.primary_cta}
          secondaryCta={banner_cta.secondary_cta}
          showSecondary={banner_cta.show_secondary}
        />
      </div>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  const headerData = loadHeaderData(locale);
  const footerData = loadFooterData(locale);
  const pageData = loadPageData('about', locale);

  return {
    props: {
      headerData,
      footerData,
      pageData,
      locale
    }
  };
}

export default About;
