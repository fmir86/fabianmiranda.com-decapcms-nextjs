import styles from './AboutMe.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const AboutMe = () => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['container']}>

                <div className={styles['left-block']}>
                    <h2>About Me</h2>
                    <p>Throughout my career as a Full-Stack Developer, I have witnessed the rise and fall of numerous technologies, this has helped me to develop a tech-agnostic mindset that allows me to focus on implementing creative strategies that align with my clients’ business objectives rather than constraining solutions to a single technology stack. This approach enables me to deliver engaging and future-proof digital products.</p>
                    <p>Over the years, I have developed software for a diverse array of organizations, including game developers, major pharmaceutical companies, small businesses, startups, Fortune 500 corporations, and expansive advertising networks. In addition, I have led development teams by establishing coding standards, optimizing workflows to reduce errors and turnaround times, and automating tasks—all while nurturing individual growth and career advancement.</p>
                    
                    <Link className='lightblue-cta' href="/contact">KNOW ME BETTER</Link>
                </div>

                <div className={styles['right-block']}>
                    <div className={styles['portrait']}>
                        <Image 
                            src="/images/aboutme/background-glow.png" 
                            alt="" 
                            width={500} 
                            height={500} 
                            className={styles['glow-and-textures']}
                        />
                        <Image 
                            src="/images/aboutme/portrait.png" 
                            alt="Portrait of Fabián Miranda" 
                            width={796} 
                            height={615} 
                            className={`${styles['picture']} relative`}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AboutMe;