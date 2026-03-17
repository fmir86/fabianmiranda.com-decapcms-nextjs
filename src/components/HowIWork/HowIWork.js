import styles from './HowIWork.module.scss';
import { resolveLucideIcon } from '../../libs/iconMap';

const HowIWork = ({ data }) => {
  return (
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          {data.title.replace(data.title_accent, '').trim()}{' '}
          <span className={styles.titleAccent}>{data.title_accent}</span>
        </h2>
        <p className={styles.subtitle}>
          {data.subtitle}
        </p>
      </div>

      {/* Steps Container with Vertical Line */}
      <div className={styles.stepsContainer}>
        {/* Timeline wrapper with pseudo-element gradient line */}
        <div className={`${styles.stepsInner} ${styles['timeline-wrapper']}`}>
          {data.steps.map((step) => {
            const IconComponent = resolveLucideIcon(step.icon);

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
                        {IconComponent && <IconComponent className={styles.icon} />}
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
