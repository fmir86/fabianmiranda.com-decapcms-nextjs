import Head from "next/head"
import Layout from "../components/Layout/Layout";
import Link from 'next/link';
import { 
  Code, 
  Palette, 
  Lightbulb, 
  MapPin, 
  Clock, 
  DollarSign, 
  Shield, 
  Users, 
  Zap,
  Brain,
  Workflow,
  BarChart3,
  Settings,
  Cloud,
  Smartphone,
  Monitor,
  Globe,
  Mail,
  Video,
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp
} from "lucide-react";

const Services = () => {
  return (
    <Layout>
      <Head>
        <title>Nearshore AI & Tech Services | Costa Rica Development | Fabian Miranda</title>
        <meta name="description" content="Reduce development costs by 40% with Costa Rica's top AI specialist. Full-stack development, AI implementation, and tech consultancy for US companies seeking nearshore excellence." />
        <meta name="keywords" content="nearshore development, costa rica web development, ai specialist, full stack developer, tech consultant, software development costa rica" />
        <meta property="og:title" content="Nearshore AI & Tech Services | Costa Rica Development" />
        <meta property="og:description" content="Transform your business with cutting-edge technology and expert consultancy from Costa Rica's leading AI specialist." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fabianmiranda.com/services" />
      </Head>

      {/* Hero Section */}
      <section className="w-full px-4 py-16 md:py-24 dark-glow-gradient">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-lightblue" />
            <span className="text-lightblue text-sm font-thin">San José, Costa Rica • GMT-6</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-thin mb-6 leading-tight">
            <span className="text-white">Accelerate Growth with</span><br />
            <span className="text-lightblue">Nearshore AI Excellence</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-thin mb-8 max-w-4xl mx-auto text-gray-300">
            Reduce development costs by <span className="text-magenta font-normal">40%</span> while accelerating time-to-market with Costa Rica's top AI specialist and full-stack development expert.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/contact" className="lightblue-cta inline-flex items-center gap-2">
              Schedule Strategy Call
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#portfolio" className="text-lightblue hover:text-magenta transition-all duration-300 inline-flex items-center gap-2">
              View Success Stories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-thin text-lightblue mb-2">12+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-thin text-lightblue mb-2">96%</div>
              <div className="text-sm text-gray-400">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-thin text-lightblue mb-2">50+</div>
              <div className="text-sm text-gray-400">Projects Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Nearshore Section */}
      <section className="w-full px-4 py-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-lightblue mb-12">Why Costa Rica Nearshore?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-darkgray p-6 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300">
              <Clock className="w-8 h-8 text-lightblue mb-4" />
              <h3 className="text-white mb-3">Real-Time Collaboration</h3>
              <p className="text-gray-400 text-sm">GMT-6 timezone enables seamless communication during US business hours. No more late-night meetings or delayed responses.</p>
            </div>
            
            <div className="bg-darkgray p-6 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300">
              <DollarSign className="w-8 h-8 text-lightblue mb-4" />
              <h3 className="text-white mb-3">40-50% Cost Savings</h3>
              <p className="text-gray-400 text-sm">Premium quality at competitive rates. Access senior-level expertise without Silicon Valley overhead costs.</p>
            </div>
            
            <div className="bg-darkgray p-6 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300">
              <Shield className="w-8 h-8 text-lightblue mb-4" />
              <h3 className="text-white mb-3">Political Stability</h3>
              <p className="text-gray-400 text-sm">Costa Rica's 75+ years of democracy and 8.29/10 democracy index provide risk mitigation for long-term partnerships.</p>
            </div>
            
            <div className="bg-darkgray p-6 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300">
              <Users className="w-8 h-8 text-lightblue mb-4" />
              <h3 className="text-white mb-3">Cultural Alignment</h3>
              <p className="text-gray-400 text-sm">95% literacy rate and strong English proficiency ensure clear communication and shared work values.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section id="services" className="w-full px-4 py-16 dark-glow-gradient">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-lightblue mb-4">Core Services</h2>
          <p className="text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Transform your business with comprehensive technology solutions designed for scalability, performance, and measurable ROI.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Development Services */}
            <div className="bg-darkgray p-8 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300 group">
              <div className="bg-gradient-to-r from-lightblue to-magenta p-3 rounded-lg inline-block mb-6">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white mb-6">Full-Stack Development</h3>
              <p className="text-gray-400 mb-6">End-to-end web applications that scale with your business growth and deliver exceptional user experiences.</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-lightblue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">React/Next.js & Node.js applications</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-lightblue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Mobile apps for iOS & Android</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-lightblue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">CLM & eDetailing for pharmaceutical</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-lightblue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">eLearning systems (SCORM/LMS)</span>
                </li>
              </ul>
              
              <div className="bg-black p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Typical ROI</span>
                  <span className="text-lightblue font-normal">300-500%</span>
                </div>
              </div>
              
              <Link href="/contact" className="lightblue-cta w-full">
                Get Development Quote
              </Link>
            </div>

            {/* AI Consultancy */}
            <div className="bg-darkgray p-8 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300 group">
              <div className="bg-gradient-to-r from-lightblue to-magenta p-3 rounded-lg inline-block mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white mb-6">AI Implementation & Strategy</h3>
              <p className="text-gray-400 mb-6">Practical AI solutions that automate workflows and drive measurable business outcomes without the hype.</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-lightblue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">AI readiness assessment & strategy</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-lightblue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Workflow automation & optimization</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-lightblue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Custom AI model development</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-lightblue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Team training & change management</span>
                </li>
              </ul>
              
              <div className="bg-black p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Efficiency Gains</span>
                  <span className="text-lightblue font-normal">40-70%</span>
                </div>
              </div>
              
              <Link href="/contact" className="lightblue-cta w-full">
                Schedule AI Assessment
              </Link>
            </div>

            {/* Tech Consultancy */}
            <div className="bg-darkgray p-8 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300 group">
              <div className="bg-gradient-to-r from-lightblue to-magenta p-3 rounded-lg inline-block mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white mb-6">Tech Leadership & Strategy</h3>
              <p className="text-gray-400 mb-6">Transform your technology operations with expert guidance on architecture, processes, and team optimization.</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-lightblue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Process audit & optimization</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-lightblue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">DevOps & CI/CD implementation</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-lightblue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Cloud architecture (AWS, Azure, GCP)</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-lightblue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Team scaling & mentorship</span>
                </li>
              </ul>
              
              <div className="bg-black p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Deploy Time Reduction</span>
                  <span className="text-lightblue font-normal">60-80%</span>
                </div>
              </div>
              
              <Link href="/contact" className="lightblue-cta w-full">
                Get Strategy Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Specializations */}
      <section className="w-full px-4 py-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-lightblue mb-4">Industry Specializations</h2>
          <p className="text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Deep expertise in regulated industries where precision, compliance, and innovation intersect.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pharmaceutical */}
            <div className="bg-darkgray p-8 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-lightblue to-magenta p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white">Pharmaceutical & Healthcare</h3>
              </div>
              
              <p className="text-gray-400 mb-6">
                FDA-compliant software development with deep understanding of GxP requirements, clinical trials, and regulatory frameworks.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-lightblue font-normal mb-1">21 CFR Part 11</div>
                  <div className="text-xs text-gray-400">Compliant systems</div>
                </div>
                <div>
                  <div className="text-lightblue font-normal mb-1">GxP Validated</div>
                  <div className="text-xs text-gray-400">Quality processes</div>
                </div>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-300 mb-6">
                <li>• CLM & eDetailing platforms</li>
                <li>• Clinical trial management systems</li>
                <li>• Regulatory submission tools</li>
                <li>• Medical education platforms</li>
              </ul>
              
              <Link href="/contact" className="text-lightblue hover:text-magenta transition-all duration-300 inline-flex items-center gap-2">
                Explore Pharma Solutions
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* eLearning */}
            <div className="bg-darkgray p-8 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-lightblue to-magenta p-3 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white">eLearning & Training</h3>
              </div>
              
              <p className="text-gray-400 mb-6">
                Innovative learning experiences that transform human capital into strategic advantage through engaging, measurable training solutions.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-lightblue font-normal mb-1">SCORM/xAPI</div>
                  <div className="text-xs text-gray-400">Standards compliant</div>
                </div>
                <div>
                  <div className="text-lightblue font-normal mb-1">AI-Powered</div>
                  <div className="text-xs text-gray-400">Personalized learning</div>
                </div>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-300 mb-6">
                <li>• Interactive learning management systems</li>
                <li>• Gamification & serious games</li>
                <li>• Virtual reality training</li>
                <li>• Assessment & analytics platforms</li>
              </ul>
              
              <Link href="/contact" className="text-lightblue hover:text-magenta transition-all duration-300 inline-flex items-center gap-2">
                Explore Learning Solutions
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="w-full px-4 py-16 dark-glow-gradient">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-lightblue mb-16">Proven Development Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-lightblue text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
              <h3 className="text-white mb-3">Strategy & Discovery</h3>
              <p className="text-gray-400 text-sm">Comprehensive analysis of business requirements, technical constraints, and success metrics.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-lightblue text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
              <h3 className="text-white mb-3">Architecture & Planning</h3>
              <p className="text-gray-400 text-sm">Scalable system design with clear milestones, timeline, and risk mitigation strategies.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-lightblue text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
              <h3 className="text-white mb-3">Agile Development</h3>
              <p className="text-gray-400 text-sm">Iterative development with weekly progress updates and continuous stakeholder feedback.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-lightblue text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">4</div>
              <h3 className="text-white mb-3">Launch & Optimization</h3>
              <p className="text-gray-400 text-sm">Seamless deployment with ongoing monitoring, optimization, and strategic enhancement recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Production Services */}
      <section className="w-full px-4 py-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-lightblue mb-4">Digital Production Excellence</h2>
          <p className="text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Creative and technical solutions for marketing teams seeking scalable, high-performance digital assets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-darkgray p-6 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300">
              <Globe className="w-8 h-8 text-lightblue mb-4" />
              <h3 className="text-white mb-3">Display Banner Ads</h3>
              <p className="text-gray-400 text-sm mb-4">Dynamic, responsive advertising that drives engagement across all platforms and devices.</p>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• HTML5 animations</li>
                <li>• Programmatic integration</li>
                <li>• Cross-platform compatibility</li>
              </ul>
            </div>
            
            <div className="bg-darkgray p-6 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300">
              <Palette className="w-8 h-8 text-lightblue mb-4" />
              <h3 className="text-white mb-3">Rich Media</h3>
              <p className="text-gray-400 text-sm mb-4">Interactive content experiences that captivate audiences and deliver measurable results.</p>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Interactive presentations</li>
                <li>• 360° product showcases</li>
                <li>• Gamified experiences</li>
              </ul>
            </div>
            
            <div className="bg-darkgray p-6 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300">
              <Mail className="w-8 h-8 text-lightblue mb-4" />
              <h3 className="text-white mb-3">HTML Emails</h3>
              <p className="text-gray-400 text-sm mb-4">Responsive email templates optimized for deliverability and engagement across all clients.</p>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Mobile-first design</li>
                <li>• A/B testing ready</li>
                <li>• Dark mode support</li>
              </ul>
            </div>
            
            <div className="bg-darkgray p-6 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300">
              <Video className="w-8 h-8 text-lightblue mb-4" />
              <h3 className="text-white mb-3">Video Ads</h3>
              <p className="text-gray-400 text-sm mb-4">Social media video content optimized for platform-specific engagement and conversion.</p>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Platform optimization</li>
                <li>• Automated versioning</li>
                <li>• Performance tracking</li>
              </ul>
            </div>
            
            <div className="bg-darkgray p-6 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300">
              <Zap className="w-8 h-8 text-lightblue mb-4" />
              <h3 className="text-white mb-3">Automated Transcreation</h3>
              <p className="text-gray-400 text-sm mb-4">Multi-language campaign adaptation that maintains brand consistency while localizing impact.</p>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Cultural adaptation</li>
                <li>• Brand consistency</li>
                <li>• Workflow automation</li>
              </ul>
            </div>
            
            <div className="bg-darkgray p-6 rounded-lg border border-trans-white hover:border-lightblue transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-lightblue mb-4" />
              <h3 className="text-white mb-3">Performance Analytics</h3>
              <p className="text-gray-400 text-sm mb-4">Data-driven insights and optimization recommendations for all digital production assets.</p>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Real-time monitoring</li>
                <li>• ROI optimization</li>
                <li>• Strategic recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 py-16 dark-glow-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-lightblue mb-6">Ready to Reduce Development Costs by 40%?</h2>
          <p className="text-xl text-gray-300 mb-8 font-thin">
            Join innovative companies leveraging Costa Rica's top tech talent for competitive advantage. Schedule a strategic consultation to discover how nearshore excellence can transform your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/contact" className="lightblue-cta inline-flex items-center gap-2">
              Schedule Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#services" className="text-lightblue hover:text-magenta transition-all duration-300 inline-flex items-center gap-2">
              Calculate Your Savings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lightblue" />
              <span>Free initial consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lightblue" />
              <span>No commitment required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lightblue" />
              <span>Same-day response</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Services;