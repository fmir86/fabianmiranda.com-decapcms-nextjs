import Link from 'next/link';
import styles from './Hero.module.scss';
import Image from 'next/image';
import HtmlContent from '../HtmlContent/HtmlContent';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from '../../libs/SplitText';
import useIsMobile from '../../hooks/useIsMobile';


const Hero = ({ data }) => {
    const isMobile = useIsMobile();
    const tagsContainer = useRef(null);
    const tlRef = useRef(null);
    const staggerProps = {each: 0.025, amount: 1.5, from: "random"}

    useEffect(() => {
        // Kill previous timeline if it exists
        if (tlRef.current) {
            tlRef.current.kill();
            tlRef.current = null;
        }

        // Reset inline styles on all tags and letters
        if (tagsContainer.current) {
            tagsContainer.current.querySelectorAll('.tag, .letter').forEach(el => {
                gsap.set(el, { clearProps: 'all' });
            });
        }

        const tl = gsap.timeline({ repeat: -1 });
        tlRef.current = tl;

        const splitter = new SplitText(tagsContainer.current, {
            selector: '.tag em',
            wrapper: 'span',
            className: 'letter',
        });
        splitter.split();

        tagsContainer.current.querySelectorAll('.tag').forEach((tag, index) => {
            const offset = index > 0 ? 0.7 : 0;
            tl.set(tag, {display:'block'}, `-=${offset}`);
            tl.set(tag.querySelectorAll('.letter'), { opacity:0, filter: 'blur(10px)', y:() => gsap.utils.random([-15, 15]) }, `-=${offset}`);
            tl.to(tag.querySelectorAll('.letter'), {
                duration: 1,
                ease: 'expo.out',
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                stagger: staggerProps,
            }, `-=${offset}`);
            tl.to(tag.querySelectorAll('.letter'), {
                duration: 0.7,
                ease: 'expo.in',
                opacity: 0,
                y: () => gsap.utils.random([-15, 15]),
                filter: 'blur(10px)',
                stagger: staggerProps,
            }, '+=4');
        });

        return () => {
            tl.kill();
        };
    }, [data.tags]);

    return (
        <div className={styles['hero']}>
            <div className={styles['wrapper']}>

                <div className={styles['left-block']}>
                    <h1 className={styles.title}>
                        {data.intro} <br/>
                        <div className={styles['tags-container']} ref={tagsContainer}>
                            {data.tags.map((tag, index) => (
                                <div key={index} className={`${styles['tag']} tag tag-${index + 1}`}>
                                    <em className={tag.color1}>{tag.line1}</em> <em className={tag.color2}>{tag.line2}</em>
                                </div>
                            ))}
                        </div>
                    </h1>
                    <HtmlContent html={data.description} />

                    <div className={styles['cta-social-row']}>

                        <Link className='lightblue-cta' href={data.cta_link}>{data.cta_text}</Link>

                        <div className={styles['social-block']}>

                            <p>{data.social_label}</p>

                            <div className={styles['social-links']}>
                                {data.social_links.map((link, index) => (
                                    <Link key={index} href={link.url} target='_blank'>
                                        <Image
                                            src={link.icon}
                                            alt={link.alt}
                                            width={36}
                                            height={36}
                                            className={styles['social-icons']}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['right-block']}>
                <Image
                    src={data.image.src}
                    alt={data.image.alt}
                    width={data.image.width}
                    height={data.image.height}
                    className={styles["david"]}
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={isMobile ? 50 : 100}
                />
                </div>
            </div>
        </div>
    );
}

export default Hero;
