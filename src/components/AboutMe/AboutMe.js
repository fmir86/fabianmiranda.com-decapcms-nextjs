import styles from './AboutMe.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const AboutMe = () => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['container']}>

                <div className={styles['left-block']}>
                    <h2>About Me</h2>
                    <p>As a <strong>nearshore software developer based in Costa Rica</strong>, I bring 15+ years of experience delivering solutions to US and global clients. My tech-agnostic mindset allows me to focus on implementing creative strategies that align with business objectives rather than constraining solutions to a single technology stack.</p>
                    <p>I have developed software for game studios, major pharmaceutical companies, startups, Fortune 500 corporations, and global advertising networks. Beyond coding, I've led development teams, established coding standards, optimized workflows to reduce turnaround times by up to 40%, and pioneered <strong>AI-powered automation</strong> to enhance team productivity.</p>
                    
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