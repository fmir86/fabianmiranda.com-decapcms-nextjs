import Image from "next/image";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Header = () => {

  const headerWrapper = useRef(null);
  const q = gsap.utils.selector(headerWrapper);


  const toggleMobileNav = (e) => {
    if(!(headerWrapper.current.getAttribute('aria-expanded') === 'true')){
      headerWrapper.current.setAttribute('aria-expanded', 'true');
      headerWrapper.current.classList.add(styles['open']);
      const tl = gsap.timeline();
      tl.set(q('.navPanel'), { x: '100%', opacity: 0 });
      tl.set(q('.navPanel ul li'), { opacity: 0, x:'20%' });
      tl.to(q('.navPanel'), { duration: 0.2, x: '0', opacity: 1, ease:'expo.out' });
      tl.to(q('.navPanel ul li'), { duration: 0.3, x: '0', opacity: 1, ease:'expo.out', stagger: 0.1 }, '-=0.05');

      gsap.set('body', { overflow: 'hidden', height: '100vh' });
    }else{
      const tl = gsap.timeline();
      tl.to(q('.navPanel ul li'), { duration: 0.2, x: '20%', opacity: 0, ease:'expo.in', stagger: 0.05 }, '-=0.05');
      tl.to(q('.navPanel'), { duration: 0.2, x: '100%', opacity: 0, ease:'expo.out', onComplete: () => {
        headerWrapper.current.classList.remove(styles['open']);
        headerWrapper.current.setAttribute('aria-expanded', 'false');
        q('.navPanel')[0].removeAttribute('style')
        document.querySelector('body').removeAttribute('style')
      }}, '-=0.0');
    }
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleMediaChange = (e) => {
      if (e.matches) {
        headerWrapper.current.classList.remove(styles['open']);
        headerWrapper.current.removeAttribute('aria-expanded');
      }
    }
    mediaQuery.addEventListener('change', handleMediaChange);
  }, []);

  return (
    <header className={`${styles['main-header']}`} ref={headerWrapper}>
      <div className={styles["container"]}>
        <Link href="/" className={styles['fm-logo']}>
          <Image src="/images/logo-fm.svg" alt="Fabian Miranda | Creative Technologist" width={160} height={52} />
        </Link>
        <nav>
            <div className={`${styles['nav-panel']} navPanel`}>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/portfolio">Portfolio</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>

            <button className={styles['close-btn']} onClick={toggleMobileNav}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>

        </nav>
      </div>
    </header>
  );
};

export default Header;
