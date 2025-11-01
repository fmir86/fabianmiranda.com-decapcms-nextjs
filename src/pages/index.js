import Head from "next/head"
import Layout from "../components/Layout/Layout";
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
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

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