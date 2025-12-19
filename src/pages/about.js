import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/SEO";
import SchemaMarkup from "../components/SEO/SchemaMarkup";
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/About.module.scss';
import TechStackHoneycomb from '../components/TechStack/TechStackHoneycomb';
import BannerCTA from '../components/BannerCTA';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas, faBrain, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { loadHeaderData, loadFooterData } from "../libs/loadGlobalData";

const About = ({ headerData, footerData }) => {

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <SEO
        title="About | Fabian Miranda - Nearshore AI & Tech Expert"
        description="Learn about Fabian Miranda - A seasoned Full-Stack Developer, AI Consultant, and Tech Leader with 15+ years of experience delivering innovative solutions from Costa Rica to global clients."
        image="/images/about/costarica-tech-hub.jpg"
        keywords="full-stack developer, AI consultant, Costa Rica, nearshore development, tech leader"
      />
      <SchemaMarkup
        type="about"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About' }
        ]}
      />

      <div className="w-full">
        {/* Hero Section */}
        <div className={styles['hero-section']}>
          <div className={styles['hero-wrapper']}>
            
            <div className={styles['hero-content']}>

              <div className={styles['hero-video']}>
                <div className={styles['video-gradient-overlay']}></div>
                <video 
                  className={styles['hero-video-element']}
                  autoPlay 
                  muted 
                  playsInline
                >
                  <source src="/video/about-banner.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>



              <h1 className={styles['hero-title']}>
                Bridging Innovation
                <span className="block">
                  <em className='magenta'>From Costa Rica</em><br/>
                  <em className='lightblue'>To The World</em>
                </span>
              </h1>
              <p className={styles['hero-subtitle']}>
                15+ years transforming ideas into scalable digital solutions, leading teams, and pioneering AI integration in enterprise environments.
              </p>
            </div>
            
            
          </div>
        </div>

        {/* Journey Section */}
        <div className={styles['journey-section']}>
          <div className={styles['container']}>
            <h2>My Journey</h2>
            <div className={styles['timeline']}>
              <div className={styles['timeline-item']}>
                <div className={styles['timeline-marker']}></div>
                <div className={styles['timeline-content']}>
                  <h3>Tech Evolution Witness</h3>
                  <p>Throughout my career as a Full-Stack Developer, I have witnessed the evolution and decline of numerous technologies—ranging from Flash and Silverlight to ColdFusion and Flex. This has helped me develop a tech-agnostic mindset, allowing me to focus on implementing creative strategies that align with my clients' business objectives rather than constraining solutions to a single technology stack.</p>
                </div>
              </div>
              
              <div className={styles['timeline-item']}>
                <div className={styles['timeline-marker']}></div>
                <div className={styles['timeline-content']}>
                  <h3>Diverse Industry Experience</h3>
                  <p>Over the years, I have developed software for a diverse array of organizations, including game developers, major pharmaceutical companies, small businesses, startups, Fortune 500 corporations, and expansive advertising networks. This breadth of experience has equipped me with unique insights into various business models and technical requirements.</p>
                </div>
              </div>
              
              <div className={styles['timeline-item']}>
                <div className={styles['timeline-marker']}></div>
                <div className={styles['timeline-content']}>
                  <h3>Leadership & Innovation</h3>
                  <p>I have led development teams by establishing coding standards, optimizing workflows to reduce errors and turnaround times by up to 40%, and automating tasks—all while nurturing individual growth and career advancement. My leadership philosophy centers on empowering teams to deliver exceptional results.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Grid */}
        <div className={styles['expertise-section']}>
          <div className={styles['container']}>
            <h2>Areas of Expertise</h2>
            <div className={styles['expertise-grid']}>
              <div className={styles['expertise-card']}>
                <div className={styles['card-content']}>
                  <div className={styles['card-icon']}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <h3>Cross-platform Software Development</h3>
                  <p>Building scalable applications for all kinds of platforms and industries. Always leveraging modern programming languages and frameworks to deploy to multiple environments. Solid expertise in Node.js backend development. See examples in my <Link href="/work" className="text-lightblue hover:text-magenta transition-colors">portfolio</Link>.</p>
                </div>
              </div>
              
              <div className={styles['expertise-card']}>
                <div className={styles['card-icon']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3>Automation & Artificial Intelligence</h3>
                <p>Pioneering artificial intelligence integration to automate business workflows, reducing development time and costs while enhancing overall campaign execution and efficiency. Learn more about my <Link href="/services#tech-consultancy" className="text-lightblue hover:text-magenta transition-colors">AI consulting services</Link> or read my insights on <Link href="/blog/2025-10-31-beyond-vibe-coding" className="text-lightblue hover:text-magenta transition-colors">the AI-assisted programming revolution</Link>.</p>
              </div>
              
              <div className={styles['expertise-card']}>
                <div className={styles['card-icon']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3>Leadership & Expert Consultancy</h3>
                <p>Applying acquired knowledge and experience to guide organizations in their digital transformation journeys, fostering innovation and driving business success. <Link href="/contact" className="text-lightblue hover:text-magenta transition-colors">Let's discuss</Link> how I can help your team navigate challenges and implement effective solutions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Focus */}
        <div className={styles['focus-section']}>
          {/* Background Video */}
          <div className={styles['focus-video-bg']}>
            <video 
              className={styles['focus-video-element']}
              autoPlay 
              muted 
              loop
              playsInline
            >
              <source src="/video/circuits.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={styles['container']}>
            <div className={styles['focus-content']}>
              <div className={styles['focus-text']}>
                <h2>Current Focus</h2>
                <p className="text-lg mb-6 text-white font-normal">
                  For the past four years, my primary focus has been creating multichannel applications and experiences that amplify advertising and communication initiatives. I place a strong emphasis on:
                </p>
                <ul className={styles['focus-list']}>
                  <li>Performance optimization and scalability</li>
                  <li>Security-first architecture</li>
                  <li>Responsive design and accessibility (WCAG 2.1 AA)</li>
                  <li>Technical SEO implementation from the ground up</li>
                  <li>AI-powered workflow automation</li>
                </ul>
                <p className="text-lg mt-6 text-white font-normal">
                  My technical toolkit often revolves around Node.js, supported by modern frameworks such as Next.js, Gatsby, and Astro. I implement architectural patterns like JAMstack, SSR, and SSG, deploying to leading platforms including Vercel, Netlify, AWS, and Azure.
                </p>
              </div>
              <div className={styles['focus-image']}>
                <TechStackHoneycomb />
              </div>
            </div>
          </div>
        </div>

        {/* Costa Rica Connection */}
        <div className={styles['location-section']}>
          <div className={styles['container']}>
            <div className={styles['location-content']}>
              <div className={styles['location-image']}>
                <Image 
                  src="/images/about/costarica-tech-hub.jpg" 
                  alt="Costa Rica tech hub" 
                  width={600} 
                  height={400} 
                  className={styles['location-photo']}
                />
              </div>
              <div className={styles['location-text']}>
                <h2>The Costa Rica Advantage</h2>
                <p className="text-lg mb-6 text-white font-normal">
                  Costa Rica is a hub for innovation and technology in Central America. Thanks to its stable political climate, strong educational system, and commitment to sustainability, the country has become a prime destination for tech companies and startups, and its workforce is known for being highly skilled and adaptable.
                </p>
                <p className="text-lg mb-6 text-white font-normal">
                  This allows me to be part of a thriving tech ecosystem that values collaboration, creativity, and fosters innovation. I've written extensively about this in my article <Link href="/blog/nearshore-advantage-costa-rica-tech-hub" className="text-lightblue hover:text-magenta transition-colors">The Nearshore Advantage: Why Costa Rica is Your Next Tech Hub</Link>.
                </p>
                <div className={styles['location-benefits']}>
                  <div className={styles['benefit']}>
                    <div className={styles['benefit-icon']}>
                      <FontAwesomeIcon icon={faEarthAmericas} size="1x"  />
                    </div>
                    <h4>Strategic <br/>Location</h4>
                    <p>Same timezone as CST, perfect for US collaboration</p>
                  </div>
                  <div className={styles['benefit']}>
                    <div className={styles['benefit-icon']}>
                      <FontAwesomeIcon icon={faBrain} size="1x" />
                    </div>
                    <h4>Educational advantage</h4>
                    <p>High English proficiency and technical expertise</p>
                  </div>
                  <div className={styles['benefit']}>
                    <div className={styles['benefit-icon']}>
                      <FontAwesomeIcon icon={faProjectDiagram} size="1x" />
                    </div>
                    <h4>Innovation <br/>Hub</h4>
                    <p>Growing tech ecosystem with Fortune 500 presence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <BannerCTA />
      </div>
    </Layout>
  )
}

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

export default About;