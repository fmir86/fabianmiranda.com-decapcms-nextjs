import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/SEO";
import SchemaMarkup from "../components/SEO/SchemaMarkup";
import ServiceBlock from '../components/ServiceBlock';
import BannerCTA from '../components/BannerCTA';
import HowIWork from '../components/HowIWork';
import styles from '../styles/Services.module.scss';
import { loadHeaderData, loadFooterData } from "../libs/loadGlobalData";
import { loadPageData } from "../libs/loadPageData";
import { resolveLucideIcon } from '../libs/iconMap';
import useIsMobile from '../hooks/useIsMobile';

const Services = ({ headerData, footerData, pageData, locale }) => {
  const isMobile = useIsMobile();
  const { seo, hero, services, how_i_work, banner_cta } = pageData;

  // Map CMS service data to the format ServiceBlock expects
  const servicesData = services.map((service) => ({
    id: service.id,
    title: service.title,
    icon: resolveLucideIcon(service.icon),
    iconBgColor: service.icon_bg_color,
    image: service.image,
    categoryTag: service.category_tag,
    description: service.description,
    features: service.feature_columns.map((col) => col.features),
    ctaText: service.cta_text,
    ctaLink: service.cta_link,
  }));

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <SEO
        title={seo.title}
        description={seo.description}
        image={seo.image}
        locale={locale}
      />
      <SchemaMarkup
        type="services"
        locale={locale}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services' }
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
                  loop
                  playsInline
                  key={isMobile ? 'mobile' : 'desktop'}
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

        {/* Main Services Section - Dynamic Service Blocks */}
        <section className={styles['services-section']}>
          <div className={styles['services-container']}>
            {servicesData.map((service) => (
              <ServiceBlock key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* How I Work Section */}
        <HowIWork data={how_i_work} />

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
  const pageData = loadPageData('services', locale);

  return {
    props: {
      headerData,
      footerData,
      pageData,
      locale
    }
  };
}

export default Services;
