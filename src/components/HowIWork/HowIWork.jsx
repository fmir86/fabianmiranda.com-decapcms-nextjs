import { Search, Map, Terminal, Rocket } from 'lucide-react';
import styles from './HowIWork.module.scss';

const steps = [
  {
    number: 1,
    title: 'DISCOVERY',
    description: 'Understanding your business needs, challenges, and goals to create the right solution.',
    icon: Search
  },
  {
    number: 2,
    title: 'STRATEGY',
    description: 'Designing the technical architecture and project roadmap with clear milestones.',
    icon: Map
  },
  {
    number: 3,
    title: 'DEVELOPMENT',
    description: 'Building with modern tools and best practices, keeping you informed every step of the way.',
    icon: Terminal
  },
  {
    number: 4,
    title: 'LAUNCH & SUPPORT',
    description: 'Deploying your solution and providing ongoing support to ensure continued success.',
    icon: Rocket
  }
];

const HowIWork = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 lg:p-8 overflow-hidden bg-black">
      {/* Header */}
      <div className="w-full max-w-7xl mx-auto text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
          HOW I <span className="text-lightblue">WORK</span>
        </h1>
        <p className="text-lg text-gray-400 mb-16 max-w-3xl mx-auto">
          A streamlined process to transform your ideas into reality, ensuring transparency and excellence at every stage.
        </p>
      </div>

      {/* Steps Container with Vertical Line */}
      <div className="w-full max-w-4xl mx-auto space-y-12 relative">
        {/* Timeline wrapper with pseudo-element gradient line */}
        <div className={`flex flex-col space-y-12 py-16 -mt-16 ${styles['timeline-wrapper']}`}>
          {steps.map((step) => {
            const IconComponent = step.icon;
            
            return (
              <div 
                key={step.number}
                className="flex flex-row items-start w-full relative z-10"
              >
                {/* Number Circle - Left aligned */}
                <div className="w-10 md:w-20 flex justify-center items-center flex-shrink-0">
                  <div 
                    className="w-10 md:w-20 h-10 md:h-20 rounded-full flex items-center justify-center text-xl md:text-3xl font-bold shrink-0 z-10"
                    style={{
                      background: 'linear-gradient(135deg, #00D4FF 0%, #9945FF 100%)',
                      boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)'
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content Card - Right aligned with icon and text in two columns */}
                <div className="relative flex-1 ml-4 md:ml-12">
                  <div 
                    className="relative z-10 flex flex-col md:flex-row gap-3 md:gap-6 p-4 md:p-8 bg-darkgray/80 backdrop-blur-sm rounded-lg h-full border border-trans-white transition-all duration-300 hover:border-lightblue"
                    style={{
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 212, 255, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Icon Column - Left */}
                    <div className="flex-shrink-0">
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center border-2"
                        style={{
                          borderColor: '#26d6fc'
                        }}
                      >
                        <IconComponent className="w-8 h-8" style={{ color: '#26d6fc' }} />
                      </div>
                    </div>

                    {/* Text Column - Right */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-lightblue mb-3">{step.title}</h3>
                      <p className="text-gray-300 text-base leading-relaxed mb-0">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowIWork;
