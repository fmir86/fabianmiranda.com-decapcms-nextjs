import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/SEO";
import SchemaMarkup from "../components/SEO/SchemaMarkup";
import Hero from "../components/Hero/Hero";
import ThreeColumns from "../components/ThreeColumns/ThreeColumns";
import AboutMe from "../components/AboutMe/AboutMe";
import WorkSamples from "../components/WorkSamples/WorkSamples";
import { loadCaseStudies } from "../libs/loadCaseStudies";
import { loadHeaderData, loadFooterData } from "../libs/loadGlobalData";
import { loadPageData } from "../libs/loadPageData";

const Home = ({ caseStudies, headerData, footerData, pageData, locale }) => {
  const { seo, hero, services_summary, about_me, work_samples } = pageData;

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <SEO
        title={seo.title}
        description={seo.description}
        image={seo.image}
        type="website"
        locale={locale}
      />
      <SchemaMarkup type="homepage" locale={locale} />

      <div>
        <Hero data={hero} />

        <ThreeColumns data={services_summary} />

        <AboutMe data={about_me} />

        <WorkSamples caseStudies={caseStudies} locale={locale} content={work_samples} />

      </div>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  const caseStudies = loadCaseStudies(locale);
  const headerData = loadHeaderData(locale);
  const footerData = loadFooterData(locale);
  const pageData = loadPageData('home', locale);

  return {
    props: {
      caseStudies,
      headerData,
      footerData,
      pageData,
      locale
    }
  };
}

export default Home;
