import Head from "next/head"
import Layout from "../components/Layout/Layout";
import { attributes, react as HomeContent } from '../../content/home.md'
import Hero from "../components/Hero/Hero";
import ThreeColumns from "../components/ThreeColumns/ThreeColumns";
import AboutMe from "../components/AboutMe/AboutMe";

const Home = () => {

  let { title, description, cats } = attributes;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <div>
        <Hero />

        <ThreeColumns />

        <AboutMe />

      </div>
    </Layout>
  )
}

export default Home;