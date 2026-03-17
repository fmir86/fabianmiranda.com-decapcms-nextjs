import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/SEO";
import Link from "next/link";
import { loadHeaderData, loadFooterData } from "../libs/loadGlobalData";
import { t } from "../libs/translations";
import { localePath } from "../libs/routeMap";
import styles from "../styles/NotFound.module.scss";

const NotFound = ({ headerData, footerData, locale }) => {
  return (
    <Layout headerData={headerData} footerData={footerData}>
      <SEO
        title={t(locale, '404.seoTitle')}
        description={t(locale, '404.seoDescription')}
        type="website"
        locale={locale}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.errorLabel}>
            {t(locale, '404.errorLabel')}
          </p>

          <h1 className={styles.heading}>
            {t(locale, '404.heading')}
          </h1>

          <p className={styles.message}>
            {t(locale, '404.message')}
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryCta}>
              {t(locale, '404.backHome')}
            </Link>

            <Link
              href={localePath('/contact', locale)}
              className={styles.secondaryCta}
            >
              {t(locale, '404.contactMe')}
            </Link>
          </div>

          <div className={styles.explore}>
            <p className={styles.exploreLabel}>{t(locale, '404.exploreLabel')}</p>
            <div className={styles.exploreLinks}>
              <Link href={localePath('/services', locale)} className={styles.exploreLink}>
                {t(locale, '404.services')}
              </Link>
              <span className={styles.separator}>|</span>
              <Link href={localePath('/work', locale)} className={styles.exploreLink}>
                {t(locale, '404.work')}
              </Link>
              <span className={styles.separator}>|</span>
              <Link href={localePath('/blog', locale)} className={styles.exploreLink}>
                {t(locale, '404.blog')}
              </Link>
              <span className={styles.separator}>|</span>
              <Link href={localePath('/about', locale)} className={styles.exploreLink}>
                {t(locale, '404.about')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  const headerData = loadHeaderData(locale);
  const footerData = loadFooterData(locale);

  return {
    props: {
      headerData,
      footerData,
      locale
    }
  };
}

export default NotFound;
