import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Services.module.scss';

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
    <div className="relative border border-trans-white p-8 overflow-hidden" style={{
      background: 'linear-gradient(200deg, rgba(255, 255, 255, 0.1) 0%, transparent 80%)',
    }}>
      {/* Grid Pattern Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        backgroundPosition: 'center'
      }}></div>
      
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row items-center mb-8">
        <div 
          className={`p-4 rounded-2xl w-16 h-16 flex items-center justify-center mr-0 sm:mr-4 mb-4 sm:mb-0`}
          style={{ background: iconBgColor }}
        >
          <IconComponent className="w-8 h-8 text-black" />
        </div>
        <h3 className="text-3xl font-[300] text-lightblue m-0">{title}</h3>
      </div>
      
      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Image Section */}
        <div className="lg:col-span-1 relative h-full">
          <div className="relative rounded-lg overflow-hidden h-full min-h-[200px] md:min-h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  width={400}
                  height={600}
                  className="object-cover object-center w-full h-full"
                  style={{ objectFit: 'cover', height: '100%' }}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              ) : (
                <div className="bg-gray-800 rounded-lg h-full w-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Image Coming Soon</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="lg:col-span-2">
          <p className="text-sm text-lightblue font-semibold mb-6">{categoryTag}</p>
          
          {/* Description */}
          {description && (
            <div className="mb-6">
              {description.map((paragraph, idx) => (
                <p 
                  key={idx} 
                  className="text-gray-300 mb-4 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          )}

          {/* Features Grid */}
          {features && features.length > 0 && (
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {features.map((column, colIdx) => (
                <ul key={colIdx} className="list-none space-y-4">
                  {column.map((feature, idx) => (
                    <li key={idx} className={styles['service-list-item']}>
                      <strong className="text-white text-lg block">{feature.title}</strong>
                      <p className="text-base text-gray-400 mt-2">{feature.description}</p>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex justify-end">
            <Link className="lightblue-cta inline-block px-8 py-3" href={ctaLink}>
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBlock;
