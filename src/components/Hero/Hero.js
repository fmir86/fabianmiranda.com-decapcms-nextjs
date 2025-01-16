import Link from 'next/link';
import styles from './Hero.module.scss';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from '../../libs/SplitText';


const Hero = () => {

    const tagsContainer = useRef(null);

    useEffect(() => {
        handleTagAnimation();
    }, []);

    const handleTagAnimation = () => {

        const q = gsap.utils.selector(tagsContainer);

        const splitter = new SplitText(tagsContainer.current, {
            selector: '.tag em',
            wrapper: 'span',
            className: 'letter',
        });
        splitter.split();

        const tl = gsap.timeline();

        tl
            .to( q('.tag-1 .letter'), {
                duration:.7, 
                ease:'expo.in', 
                opacity:0, 
                y:() => gsap.utils.random([-15, 15]), 
                filter: 'blur(10px)',  
                stagger: {
                    each: 0.05, // Base stagger delay
                    amount: 1, // Total duration of staggered animations
                    from: "random", // Apply animations in random order
                },
            }, '+=4')
            .set( q('.tag-2'), {display:'block'}, '-=0.5')
            .from( q('.tag-2 .letter'), {
                duration:.7, 
                ease:'expo.out', 
                opacity:0, 
                y:() => gsap.utils.random([-15, 15]), 
                filter: 'blur(10px)',  
                stagger: {
                    each: 0.05, // Base stagger delay
                    amount: 1, // Total duration of staggered animations
                    from: "random", // Apply animations in random order
                }
            }, '-=0.5')
            .to( q('.tag-2 .letter'), {
                duration:.7, 
                ease:'expo.in', 
                opacity:0, 
                y:() => gsap.utils.random([-15, 15]), 
                filter: 'blur(10px)',  
                stagger: {
                    each: 0.05, // Base stagger delay
                    amount: 1, // Total duration of staggered animations
                    from: "random", // Apply animations in random order
                },
            }, '+=4')
            .set( q('.tag-3'), {display:'block'}, '-=0.5')
            .from( q('.tag-3 .letter'), {
                duration:.7, 
                ease:'expo.out', 
                opacity:0, 
                y:() => gsap.utils.random([-15, 15]), 
                filter: 'blur(10px)',  
                stagger: {
                    each: 0.05, // Base stagger delay
                    amount: 1, // Total duration of staggered animations
                    from: "random", // Apply animations in random order
                }
            }, '-=0.5')


          

        
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
                    <p>Discover how I can develop scalable & performant applications, conceptualize efficient solutions, and establish smart workflows. With expertise in training and shaping tech teams, I can help your organization operate smarter and faster. <br/><b>Allow me to help you succeed</b>.</p>
               
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
                    src="/images/home-hero/cyber-david.png" alt="Portrait of Fabián Miranda" 
                    width={796} 
                    height={615} 
                    className={styles["david"]}
                />
                </div>
            </div>
        </div>
    );
}

export default Hero;