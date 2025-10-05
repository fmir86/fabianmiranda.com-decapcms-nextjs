import Link from 'next/link';
import styles from './BannerCTA.module.scss';

const BannerCTA = ({ 
  title = "Ready to Transform Your Business?",
  description = "Let's discuss how my expertise in AI, full-stack development, and nearshore team leadership can accelerate your next project.",
  primaryCta = {
    text: "START A CONVERSATION",
    link: "/contact"
  },
  secondaryCta = {
    text: "VIEW MY WORK",
    link: "/#work-samples"
  },
  showSecondary = true
}) => {
  return (
    <div className={styles['cta-section']}>
      <div className={styles['container']}>
        <div className={styles['cta-content']}>
          <h2>{title}</h2>
          <p className="text-xl mb-8 text-white font-normal">
            {description}
          </p>
          <div className={styles['cta-buttons']}>
            <Link className='lightblue-cta' href={primaryCta.link}>
              {primaryCta.text}
            </Link>
            {showSecondary && (
              <Link className={styles['secondary-cta']} href={secondaryCta.link}>
                {secondaryCta.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCTA;
