import Head from "next/head"
import Layout from "../components/Layout/Layout";

const Blog = () => {

  return (
    <Layout>
      <Head>
        <title>Blog | Fabian Miranda - Creative Technologist</title>
        <meta name="description" content={'About | Fabian Miranda - Creative Technologist'} />
      </Head>

      <div className="w-full px-4 flex flex-col grow justify-center items-center dark-glow-gradient">
        <div className="max-w-7xl mx-auto">
            <p className="text-white text-4xl font-thin text-center"><strong>BLOG</strong> <br/>Coming Soon</p>
        </div>
      </div>
    </Layout>
  )
}

export default Blog;