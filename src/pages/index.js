import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/SEO";
import { attributes, react as HomeContent } from '../../content/home.md'
import Hero from "../components/Hero/Hero";
import ThreeColumns from "../components/ThreeColumns/ThreeColumns";
import AboutMe from "../components/AboutMe/AboutMe";
import WorkSamples from "../components/WorkSamples/WorkSamples";
import { loadCaseStudies } from "../libs/loadCaseStudies";
import { loadHeaderData, loadFooterData } from "../libs/loadGlobalData";

const Home = ({ caseStudies, headerData, footerData }) => {

  let { title, description, cats } = attributes;

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <SEO
        title={`${title} | Fabian Miranda - Creative Technologist`}
        description={description}
        image="/images/og-default.jpg"
        type="website"
      />

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