import Head from "next/head"
import Layout from "../components/Layout/Layout";
import Link from 'next/link';
import ServiceBlock from '../components/ServiceBlock';
import BannerCTA from '../components/BannerCTA';
import HowIWork from '../components/HowIWork';
import { Code, Palette, Lightbulb } from "lucide-react";
import styles from '../styles/Services.module.scss';

const servicesData = [
  {
    id: 'development',
    title: 'Development',
    icon: Code,
    iconBgColor: 'linear-gradient(135deg, #00D4FF 0%, #3B82F6 100%)', // lightblue to blue-400
    image: '/images/services/development-1.jpg',
    categoryTag: 'AI-POWERED SOLUTIONS',
    description: [
      'Using AI-powered development tools and modern workflows, I provide businesses with high-quality development services at a fraction of the traditional cost—without compromising on speed or quality.',
    ],
    features: [
      [
        {
          title: 'Full-Stack Web Development',
          description: 'From Modern Node & React/Next.js applications to robust CMS solutions built on technologies like Wordpress, AEM, Strapi, and much more.'
        },
        {
          title: 'CLM & eDetailing',
          description: 'Pharmaceutical sales presentations for Veeva, Pitcher, Showpad, or standalone. With intelligent content adaptation for multiple journeys, and tracking capabilities.'
        },
        {
          title: 'Mobile & Desktop Apps',
          description: 'Cross-platform applications that maximize reach and engagement, built with React Native, Flutter, or Electron.'
        }
      ],
      [
        {
          title: 'eLearning Systems (SCORM/LMS)',
          description: 'Educational platforms with AI-powered personalized learning paths and automated progress tracking'
        },
        {
          title: 'Intelligent Workflow Automation',
          description: 'Automate workflows and business processes to reduce manual tasks and improve efficiency across your organization.'
        },
        {
          title: 'Game Development',
          description: 'Gamify your interactive experiences and training materials to boost engagement and retention.'
        }
      ]
    ],
    ctaText: 'START AI DEVELOPMENT',
    ctaLink: '/contact'
  },
  {
    id: 'digital-production',
    title: 'Digital Production',
    icon: Palette,
    iconBgColor: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)', // purple-500 to pink-400
    image: '/images/services/digital-production-1.jpg',
    categoryTag: 'AI-ENHANCED CREATIVE',
    description: [
      'Innovative digital experiences efficiently produced. My production workflow integrates AI tools powered by <strong class="text-white">Claude, ChatGPT, and Gemini Pro</strong> for enhanced efficiency without sacrificing creative quality.',
      'From dynamic banner campaigns with personalization capabilities to automated transcreation across multiple languages, I deliver campaigns that adapt in real-time.'
    ],
    features: [
      [
        {
          title: 'Display Ads',
          description: 'Creation of massive amounts of display ads at lightning speed thanks to automations and AI-driven workflows.'
        },
        {
          title: 'Dynamic Banner Campaigns',
          description: 'Dynamic ads that connect to data-sheets managed directly by client. Allowing them to create variations and update content as simple as creating a row.'
        },
        {
          title: 'Rich Media Experiences',
          description: 'Interactive content that adapts based on user behavior and engagement patterns'
        },
      ],
      [
        {
          title: 'HTML Email Templates',
          description: 'Responsive and Dark-mode ready email templates with cross-client compatibility and optimized for multiple platforms & services'
        },
        {
          title: 'Social Media Video Ads',
          description: 'Video ads optimized for social media platforms, created with AI-assisted video editing tools to ensure efficiency and maximum engagement.'
        }
      ]
    ],
    ctaText: 'OPTIMIZE PRODUCTION',
    ctaLink: '/contact'
  },
  {
    id: 'tech-consultancy',
    title: 'Tech Consultancy',
    icon: Lightbulb,
    iconBgColor: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)', // green-400 to blue-500
    image: '/images/services/tech-consultancy-1.jpg',
    categoryTag: 'STRATEGIC AI GUIDANCE',
    description: [
      'Transform your business with intelligent automation powered by <strong class="text-white">Anthropic\'s Claude</strong>, <strong class="text-white">OpenAI\'s ChatGPT</strong>, and <strong class="text-white">Google\'s Gemini Pro</strong>. As an AI specialist, I deliver solutions that combine full-stack development expertise with advanced AI implementation.',
      'From implementing <strong class="text-white">Retrieval Augmented Generation (RAG)</strong>, to orchestrating AI Agents through advanced MCP (Model Context Protocol) integrations, I build intelligent systems that will boost your organization efficiency, by connecting your data to powerful AI models, and providing the required context they need to execute automated actions.'
    ],
    features: [
      [
        {
          title: 'AI Strategy & Implementation',
          description: 'Discovery, pilot development, and scaled deployment with clear ROI measurement within 30-60 days'
        },
        {
          title: 'Workflow Automation',
          description: 'Process optimization using AI agents that reduce manual work and improve accuracy across all business functions'
        },
        {
          title: 'DevOps & Cloud Architecture',
          description: 'CI/CD implementation with AI-powered testing and automated deployment across AWS, Azure, and Google Cloud'
        }
      ],
      [
        {
          title: 'Process Audit & Optimization',
          description: 'Identifying bottlenecks and implementing efficient solutions with measurable performance improvements'
        },
        {
          title: 'Knowledge Transfer',
          description: 'Train your team to maintain and expand AI capabilities independently with comprehensive documentation'
        }
      ]
    ],
    ctaText: 'EXPLORE AI STRATEGY',
    ctaLink: '/contact'
  }
];

const Services = () => {
  return (
    <Layout>
      <Head>
        <title>Services | Fabian Miranda - Creative Technologist</title>
        <meta name="description" content="Expert technology services including full-stack development, digital production, and tech consultancy. Specializing in AI implementation, pharmaceutical solutions, and eLearning systems." />
        <meta name="keywords" content="full stack developer, ai specialist, tech consultant, clm edetailing, elearning scorm, digital production" />
        <meta property="og:title" content="Services | Fabian Miranda - Creative Technologist" />
        <meta property="og:description" content="Expert technology services from development to AI consultancy" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fabianmiranda.com/services" />
      </Head>

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
                  loop
                  playsInline
                >
                  <source src="/video/services.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <h1 className={styles['hero-title']}>
                Technology Solutions
                <span className="block">
                  <em className='magenta'>That Drive</em><br/>
                  <em className='lightblue'>Real Results</em>
                </span>
              </h1>
              <p className={styles['hero-subtitle']}>
                From AI-powered development to digital production excellence, delivering comprehensive solutions that transform businesses and accelerate growth.
              </p>
            </div>
            
          </div>
        </div>

        {/* Main Services Section - Dynamic Service Blocks */}
        <section className="px-6 py-20 w-full">
          <div className="flex flex-col max-w-7xl mx-auto space-y-12">
            {servicesData.map((service) => (
              <ServiceBlock key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* How I Work Section */}
        <HowIWork />

        {/* CTA Section */}
        <BannerCTA 
          title="Ready to Start Your Project?"
          description="Let's discuss your needs and explore how I can help bring your vision to life."
          primaryCta={{
            text: "GET IN TOUCH",
            link: "/contact"
          }}
          secondaryCta={{
            text: "VIEW PORTFOLIO",
            link: "/portfolio"
          }}
        />
      </div>
    </Layout>
  )
}

export default Services;
