import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/SEO";
import SchemaMarkup from "../components/SEO/SchemaMarkup";
import Hero from "../components/Hero/Hero";
import ThreeColumns from "../components/ThreeColumns/ThreeColumns";
import AboutMe from "../components/AboutMe/AboutMe";
import WorkSamples from "../components/WorkSamples/WorkSamples";
import { loadCaseStudies } from "../libs/loadCaseStudies";
import { loadHeaderData, loadFooterData } from "../libs/loadGlobalData";

const Home = ({ caseStudies, headerData, footerData }) => {
  return (
    <Layout headerData={headerData} footerData={footerData}>
      <SEO
        title="Fabian Miranda - Creative Technologist | Web Development | Digital Production"
        description="Full-stack developer and creative technologist specializing in web development, digital production, and tech consulting. 15+ years delivering innovative solutions from Costa Rica to global clients."
        image="/images/og-default-v2.jpg"
        type="website"
      />
      <SchemaMarkup type="homepage" />

      <div>
        <Hero />

        <ThreeColumns />

        <AboutMe />

        <WorkSamples caseStudies={caseStudies} />

      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const caseStudies = loadCaseStudies();
  const headerData = loadHeaderData();
  const footerData = loadFooterData();

  return {
    props: {
      caseStudies,
      headerData,
      footerData
    }
  };
}

export default Home;