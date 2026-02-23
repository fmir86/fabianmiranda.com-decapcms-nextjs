import Link from 'next/link';
import Image from 'next/image';
import styles from './ServiceBlock.module.scss';

const ServiceBlock = ({ service }) => {
  const {
    title,
    icon: IconComponent,
    iconBgColor,
    image,
    categoryTag,
    introTitle,
    description,
    features,
    ctaText,
    ctaLink
  } = service;

  return (
    <div className={styles.block}>
      {/* Grid Pattern Overlay */}
      <div className={styles.gridOverlay}></div>
      
      {/* Title Section */}
      <div className={styles.titleRow}>
        <div 
          className={styles.iconBg}
          style={{ background: iconBgColor }}
        >
          <IconComponent className={styles.iconInner} />
        </div>
        <h3 className={styles.blockTitle}>{title}</h3>
      </div>
      
      {/* Content Grid */}
      <div className={styles.contentGrid}>
        {/* Image Section */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageInner}>
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  width={400}
                  height={600}
                  className={styles.serviceImage}
                  style={{ objectFit: 'cover', height: '100%' }}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              ) : (
                <div className={styles.placeholder}>
                  <span className={styles.placeholderText}>Image Coming Soon</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className={styles.textColumn}>
          <p className={styles.categoryTag}>{categoryTag}</p>
          
          {/* Description */}
          {description && (
            <div className={styles.descriptionBlock}>
              {description.map((paragraph, idx) => (
                <p 
                  key={idx} 
                  className={styles.descriptionText}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          )}

          {/* Features Grid */}
          {features && features.length > 0 && (
            <div className={styles.featuresGrid}>
              {features.map((column, colIdx) => (
                <ul key={colIdx} className={styles.featureList}>
                  {column.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <strong className={styles.featureTitle}>{feature.title}</strong>
                      <p className={styles.featureDesc}>{feature.description}</p>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className={styles.ctaRow}>
            <Link className={styles.ctaButton} href={ctaLink}>
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBlock;
