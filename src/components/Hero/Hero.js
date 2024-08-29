import Link from 'next/link';
import styles from './Hero.module.scss';
import Image from 'next/image';

const Hero = () => {
    return (
        <div className={styles['hero']}>
            <div className={styles['wrapper']}>

                <div className={styles['left-block']}>
                    <h1 className={styles.title}>
                        I am Fabián Miranda, <br/>
                        <span>
                            <em className='magenta'>Creative</em> <em className='lightblue'>Technologist</em>
                        </span>
                    </h1>
                    <p>Discover how I can develop scalable & performant applications, conceptualize efficient solutions, and establish smart workflows. With expertise in training and shaping tech teams, I can help your organization operate smarter and faster. <br/><b>Allow me to help you succeed</b>.</p>
               
                    <div className={styles['cta-social-row']}>

                        <Link className='lightblue-cta' href="/">GET IN TOUCH</Link>

                        <div className={styles['social-block']}>
                            
                            <p>ALSO, FIND ME ON:</p>

                            <div className='flex'>
                                <Link href="https://www.linkedin.com/in/fmir86/" target='_blank'>
                                    <Image src="/images/social-media/icon-li.svg" alt="My LinkedIn Profile" width={36} height={36}/>
                                </Link>
                                <Link href="https://github.com/fmir86" target='_blank'>
                                    <Image src="/images/social-media/icon-github.svg" alt="My Github Profile" width={36} height={36}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['right-block']}>
                    <div className={styles['portrait']}>
                        <Image src="/images/home-hero/textures.png" alt="" width={500} height={500} className={styles['glow-and-textures']}/>
                        <Image src="/images/home-hero/hero-portrait.png" alt="Portrait of Fabián Miranda" width={796} height={615} className='relative'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;