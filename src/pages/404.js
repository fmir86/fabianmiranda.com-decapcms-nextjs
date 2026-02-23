import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/SEO";
import Link from "next/link";
import { loadHeaderData, loadFooterData } from "../libs/loadGlobalData";
import styles from "../styles/NotFound.module.scss";

const NotFound = ({ headerData, footerData }) => {
  return (
    <Layout headerData={headerData} footerData={footerData}>
      <SEO
        title="Page Not Found - Fabian Miranda"
        description="The page you're looking for doesn't exist or has been moved. Let's get you back on track."
        type="website"
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.errorLabel}>
            Error 404
          </p>

          <h1 className={styles.heading}>
            Page Not Found
          </h1>

          <p className={styles.message}>
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryCta}>
              Back to Home
            </Link>

            <Link
              href="/contact"
              className={styles.secondaryCta}
            >
              Contact Me
            </Link>
          </div>

          <div className={styles.explore}>
            <p className={styles.exploreLabel}>Or explore these pages:</p>
            <div className={styles.exploreLinks}>
              <Link href="/services" className={styles.exploreLink}>
                Services
              </Link>
              <span className={styles.separator}>|</span>
              <Link href="/work" className={styles.exploreLink}>
                Work
              </Link>
              <span className={styles.separator}>|</span>
              <Link href="/blog" className={styles.exploreLink}>
                Blog
              </Link>
              <span className={styles.separator}>|</span>
              <Link href="/about" className={styles.exploreLink}>
                About
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  const headerData = loadHeaderData();
  const footerData = loadFooterData();

  return {
    props: {
      headerData,
      footerData
    }
  };
}

export default NotFound;
