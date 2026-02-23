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
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          HOW I <span className={styles.titleAccent}>WORK</span>
        </h1>
        <p className={styles.subtitle}>
          A streamlined process to transform your ideas into reality, ensuring transparency and excellence at every stage.
        </p>
      </div>

      {/* Steps Container with Vertical Line */}
      <div className={styles.stepsContainer}>
        {/* Timeline wrapper with pseudo-element gradient line */}
        <div className={`${styles.stepsInner} ${styles['timeline-wrapper']}`}>
          {steps.map((step) => {
            const IconComponent = step.icon;
            
            return (
              <div 
                key={step.number}
                className={styles.stepRow}
              >
                {/* Number Circle - Left aligned */}
                <div className={styles.numberColumn}>
                  <div className={styles.numberCircle}>
                    {step.number}
                  </div>
                </div>

                {/* Content Card - Right aligned with icon and text in two columns */}
                <div className={styles.cardColumn}>
                  <div className={styles.card}>
                    {/* Icon Column - Left */}
                    <div className={styles.iconWrapper}>
                      <div className={styles.iconBox}>
                        <IconComponent className={styles.icon} />
                      </div>
                    </div>

                    {/* Text Column - Right */}
                    <div className={styles.textColumn}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepDescription}>
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
