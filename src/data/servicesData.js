import { Code, Palette, Lightbulb } from "lucide-react";

export const servicesData = [
  {
    id: 'development',
    title: 'Development',
    icon: Code,
    iconBgColor: 'linear-gradient(135deg, #00D4FF 0%, #3B82F6 100%)', // lightblue to blue-400
    image: '/images/services/development-1.jpg',
    categoryTag: 'AI-POWERED SOLUTIONS',
    description: [
      'Transform your business with intelligent automation powered by <strong class="text-white">Anthropic\'s Claude</strong>, <strong class="text-white">OpenAI\'s ChatGPT</strong>, and <strong class="text-white">Google\'s Gemini Pro</strong>. As a nearshore AI specialist based in Costa Rica, I deliver solutions that combine full-stack development expertise with advanced AI implementation.',
      'Using <strong class="text-white">Retrieval Augmented Generation (RAG)</strong>, I build intelligent systems that connect your organizational data to powerful AI models, enabling real-time analysis that transforms raw information into competitive advantage.'
    ],
    features: [
      [
        {
          title: 'Full-Stack Web Development',
          description: 'Modern React/Next.js applications with AI-enhanced backend systems that process and analyze data automatically'
        },
        {
          title: 'CLM & eDetailing with AI',
          description: 'AI-enhanced pharmaceutical sales presentations with intelligent content adaptation and compliance monitoring'
        },
        {
          title: 'Mobile & Desktop Apps',
          description: 'Cross-platform applications with embedded AI capabilities for real-time decision making'
        }
      ],
      [
        {
          title: 'eLearning Systems (SCORM/LMS)',
          description: 'Educational platforms with AI-powered personalized learning paths and automated progress tracking'
        },
        {
          title: 'Intelligent Workflow Automation',
          description: 'Custom AI agents that handle complex business processes and automated code reviews'
        },
        {
          title: 'Game Development',
          description: 'Interactive experiences and serious games for training with AI-driven engagement analytics'
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
    image: '/images/services/digital-production-1.jpg', // FPO for now
    categoryTag: 'AI-ENHANCED CREATIVE',
    description: [
      'Innovative digital experiences enhanced by AI automation for unprecedented efficiency. My production workflow integrates AI tools powered by <strong class="text-white">Claude, ChatGPT, and Gemini Pro</strong> for enhanced efficiency without sacrificing creative quality.',
      'From intelligent banner systems with AI-powered personalization to automated transcreation across multiple languages, I deliver campaigns that adapt and optimize in real-time using machine learning algorithms.'
    ],
    features: [
      [
        {
          title: 'Intelligent Banner Systems',
          description: 'Dynamic ad creation using AI-powered personalization and automated A/B testing with real-time optimization'
        },
        {
          title: 'Rich Media Experiences',
          description: 'Interactive content that adapts based on user behavior and engagement patterns using AI analytics'
        },
        {
          title: 'HTML Email Templates',
          description: 'AI-optimized email templates with cross-client compatibility and automated deliverability optimization'
        }
      ],
      [
        {
          title: 'Automated Transcreation',
          description: 'Multi-language campaign adaptation using AI translation and cultural optimization while maintaining brand consistency'
        },
        {
          title: 'Social Media Video Optimization',
          description: 'Platform-optimized video content with automated resizing, format optimization, and engagement tracking'
        },
        {
          title: 'Performance Analytics',
          description: 'Real-time optimization using machine learning algorithms that automatically improve campaign ROI'
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
    image: '/images/services/tech-consultancy-1.jpg', // FPO for now
    categoryTag: 'STRATEGIC AI GUIDANCE',
    description: [
      'Navigate AI transformation without the hype. While many consultants promise unrealistic AI magic, I focus on practical implementation that delivers measurable ROI. My approach begins with comprehensive audits of existing workflows, identifying specific areas where AI can eliminate bottlenecks and accelerate decision-making processes.',
      'Using advanced <strong class="text-white">RAG (Retrieval Augmented Generation)</strong> systems, I create intelligent platforms that connect your organizational knowledge to powerful LLMs, enabling real-time data analysis and strategic insights with proper governance and continuous improvement.'
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
          title: 'Pharmaceutical AI Solutions',
          description: 'FDA-compliant AI systems for clinical data analysis, regulatory reporting, and automated compliance monitoring'
        },
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
