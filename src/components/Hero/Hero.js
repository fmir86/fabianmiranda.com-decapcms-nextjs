import Link from 'next/link';
import styles from './Hero.module.scss';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from '../../libs/SplitText';


const Hero = () => {

    const tagsContainer = useRef(null);
    const q = gsap.utils.selector(tagsContainer);
    const tl = gsap.timeline({repeat: -1});
    const staggerProps = {each: 0.025, amount: 1.5, from: "random"}


    useEffect(() => {
        handleTagAnimation();
    }, []);

    const animatePhrase = (elem, offset) => {

        tl.set(elem, {display:'block'}, `-=${offset}`);
        tl.set( elem.querySelectorAll(`.letter`), { opacity:0, filter: 'blur(10px)', y:() => gsap.utils.random([-15, 15]) },`-=${offset}` )
        tl.to( elem.querySelectorAll(`.letter`), {
            duration:1, 
            ease:'expo.out', 
            opacity:1, 
            y: 0, 
            filter: 'blur(0px)',  
            stagger:staggerProps,
        }, `-=${offset}`)
        tl.to( elem.querySelectorAll(`.letter`), {
            duration:.7, 
            ease:'expo.in', 
            opacity:0,
            y:() => gsap.utils.random([-15, 15]), 
            filter: 'blur(10px)',  
            stagger:staggerProps, 
        }, `+=4`)
    }

    const handleTagAnimation = () => {

        const splitter = new SplitText(tagsContainer.current, {
            selector: '.tag em',
            wrapper: 'span',
            className: 'letter',
        });
        splitter.split();

        tagsContainer.current.querySelectorAll('.tag').forEach((tag, index) => {
            animatePhrase(tag, (index > 0) ? 0.7 : 0);
        })
    }

    return (
        <div className={styles['hero']}>
            <div className={styles['wrapper']}>

                <div className={styles['left-block']}>
                    <h1 className={styles.title}>
                        I am Fabián Miranda, <br/>
                        <div className={styles['tags-container']} ref={tagsContainer}>
                            <div className={`${styles['tag']} tag tag-1`}>
                                <em className='magenta'>Creative</em> <em className='lightblue'>Technologist.</em>
                            </div>
                            <div className={`${styles['tag']} tag tag-2`}>
                                <em className='magenta'>Full-Stack</em> <em className='lightblue'>Developer.</em>
                            </div>
                            <div className={`${styles['tag']} tag tag-3`}>
                                <em className='magenta'>Tech/AI</em> <em className='lightblue'>Consultant.</em>
                            </div>
                        </div>
                    </h1>
                    <p>Based in <b>Costa Rica</b>, I provide <b>nearshore software development</b> and <b>AI-powered solutions</b> to US and global clients. From scalable web applications to intelligent workflow automation, I help organizations operate smarter and faster. <br/><b>Let's build something great together</b>.</p>
               
                    <div className={styles['cta-social-row']}>

                        <Link className='lightblue-cta' href="/contact">GET IN TOUCH</Link>

                        <div className={styles['social-block']}>
                            
                            <p>ALSO, FIND ME ON:</p>

                            <div className='flex'>
                                <Link href="https://www.linkedin.com/in/fmir86/" target='_blank'>
                                    <Image 
                                        src="/images/social-media/icon-li.svg" 
                                        alt="My LinkedIn Profile" 
                                        width={36} 
                                        height={36}
                                        className={styles['social-icons']}
                                    />
                                </Link>
                                <Link href="https://github.com/fmir86" target='_blank'>
                                    <Image 
                                        src="/images/social-media/icon-github.svg" 
                                        alt="My Github Profile" 
                                        width={36} 
                                        height={36} 
                                        className={styles['social-icons']}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['right-block']}>
                <Image
                    src="/images/home-hero/cyber-david.png"
                    alt="Portrait of Fabián Miranda"
                    width={796}
                    height={615}
                    className={styles["david"]}
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                </div>
            </div>
        </div>
    );
}

export default Hero;