import styles from './AboutMe.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import HtmlContent from '../HtmlContent/HtmlContent';
import useIsMobile from '../../hooks/useIsMobile';

const AboutMe = ({ data }) => {
    const isMobile = useIsMobile();
    return (
        <div className={styles['wrapper']}>
            <div className={styles['container']}>

                <div className={styles['left-block']}>
                    <h2>{data.title}</h2>
                    {data.paragraphs.map((paragraph, index) => (
                        <HtmlContent key={index} html={paragraph} />
                    ))}

                    <Link className='lightblue-cta' href={data.cta_link}>{data.cta_text}</Link>
                </div>

                <div className={styles['right-block']}>
                    <div className={styles['portrait']}>
                        <Image
                            src={data.portrait.glow_src}
                            alt=""
                            width={500}
                            height={500}
                            className={styles['glow-and-textures']}
                            sizes="300px"
                            quality={isMobile ? 50 : 100}
                        />
                        <Image
                            src={data.portrait.src}
                            alt={data.portrait.alt}
                            width={796}
                            height={615}
                            className={`${styles['picture']} relative`}
                            sizes="(max-width: 768px) 100vw, 400px"
                            quality={isMobile ? 50 : 100}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AboutMe;
