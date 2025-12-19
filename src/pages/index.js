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
        title="Fabian Miranda - Nearshore Developer & AI Consultant | Costa Rica"
        description="Nearshore software development and AI consulting from Costa Rica. Full-stack developer specializing in AI-powered web applications, digital production, and tech consulting for US and global clients."
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