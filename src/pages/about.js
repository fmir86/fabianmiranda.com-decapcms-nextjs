import Head from "next/head"
import Layout from "../components/Layout/Layout";

const About = () => {

  return (
    <Layout>
      <Head>
        <title>About | Fabian Miranda - Creative Technologist</title>
        <meta name="description" content={'About | Fabian Miranda - Creative Technologist'} />
      </Head>

      <div className="w-full px-4 flex flex-col grow justify-center items-center dark-glow-gradient">
        <div className="max-w-7xl mx-auto">
            <h1>About Me</h1>
            <p>Throughout my career as a Full-Stack Developer, I have witnessed the evolution and decline of numerous technologies—ranging from Flash and Silverlight to ColdFusion and Flex. This has help me to develop a tech-agnostic mindset, that allows me to focus on implementing creative strategies that align with my clients’ business objectives rather than constraining solutions to a single technology stack. This approach enables me to deliver engaging and future-proof digital products.</p>
            <p>Over the years, I have developed software for a diverse array of organizations, including game developers, major pharmaceutical companies, small businesses, startups, Fortune 500 corporations, and expansive advertising networks. In addition, I have led development teams by establishing coding standards, optimizing workflows to reduce errors and turnaround times, and automating tasks—all while nurturing individual growth and career advancement.</p>
            <p>For the past four years, my primary focus has been creating multichannel applications and experiences that amplify advertising and communication initiatives. I place a strong emphasis on performance, security, scalability, responsiveness, usability, and accessibility, as well as integrating technical SEO from the ground up to secure a strong online presence.</p>
            <p>My technical toolkit often revolves around NodeJS, supported by modern frameworks such as NextJS, Gatsby, and Astro, along with popular libraries like React, Vue, and Angular. I implement architectural and rendering patterns—such as JamStack, SSR, and SSG—and deploy to leading platforms, including Vercel, Netlify, Render, AWS, and Azure.</p>
            <p>Recently, I have delved into artificial intelligence research to identify strategies for incorporating AI into day-to-day workflows, reducing development time and costs while enhancing overall campaign execution and efficiency.</p>
        </div>
      </div>
    </Layout>
  )
}

export default About;