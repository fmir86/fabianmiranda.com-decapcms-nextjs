import Image from "next/image";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Globe } from "lucide-react";
import gsap from "gsap";
import { localePath, enPath } from "../../libs/routeMap";

const Header = ({ logo, navigation, alternateSlug }) => {

  const router = useRouter();
  const headerWrapper = useRef(null);
  const q = gsap.utils.selector(headerWrapper);
  const isActive = (path) => router.asPath === path || router.pathname === path;
  const currentLocale = router.locale || 'en';
  const altLocale = currentLocale === 'en' ? 'es' : 'en';

  // Compute the language switch URL
  const getLanguageSwitchHref = () => {
    const { pathname, asPath } = router;

    // Dynamic pages: use alternateSlug if provided
    if (pathname.includes('[slug]') && alternateSlug) {
      if (pathname === '/blog/[slug]') {
        return `/blog/${alternateSlug}`;
      }
      if (pathname === '/work/[slug]') {
        if (altLocale === 'es') {
          return `/portafolio/${alternateSlug}`;
        }
        return `/work/${alternateSlug}`;
      }
    }

    // Static pages
    if (altLocale === 'es') {
      // EN → ES: translate the current pathname
      return localePath(pathname, 'es');
    } else {
      // ES → EN: reverse-translate from the visible path
      // With rewrites, asPath shows the translated URL (e.g. /acerca-de-mi)
      return enPath(asPath);
    }
  };

  const closeMobileNav = (onComplete) => {
    document.body.classList.remove('no-scroll');
    const tl = gsap.timeline();

    tl.to(q('.navPanel ul li'), { duration: 0.2, x: '20%', opacity: 0, ease:'expo.in', stagger: 0.05, onComplete:()=>{
      document.querySelectorAll('.navPanel ul li').forEach(item => item.removeAttribute('style'));
    }}, '-=0.05');

    tl.to(q('.navPanel'), { duration: 0.2, x: '100%', opacity: 0, ease:'expo.out', onComplete: () => {
      if(headerWrapper.current){
        headerWrapper.current.classList.remove(styles['open']);
        headerWrapper.current.setAttribute('aria-expanded', 'false');
      }
      q('.navPanel')[0].removeAttribute('style');
      if (onComplete) onComplete();
    }}, '-=0.0');
  };

  const toggleMobileNav = () => {
    if(!(headerWrapper.current.getAttribute('aria-expanded') === 'true')){
      headerWrapper.current.setAttribute('aria-expanded', 'true');
      headerWrapper.current.classList.add(styles['open']);
      const tl = gsap.timeline();
      tl.set(q('.navPanel'), { x: '100%', opacity: 0 });
      tl.set(q('.navPanel ul li'), { opacity: 0, x:'20%' });
      tl.to(q('.navPanel'), { duration: 0.2, x: '0', opacity: 1, ease:'expo.out' });
      tl.to(q('.navPanel ul li'), { duration: 0.3, x: '0', opacity: 1, ease:'expo.out', stagger: 0.1 }, '-=0.05');
      document.body.classList.add('no-scroll');
    }else{
      closeMobileNav();
    }
  }

  const handleMobileLangSwitch = (e) => {
    e.preventDefault();
    const href = getLanguageSwitchHref();
    closeMobileNav(() => {
      router.push(href, href, { locale: altLocale });
    });
  };

  // Clean up mobile nav state on route change (without close animation)
  useEffect(() => {
    const handleRouteChange = () => {
      if (headerWrapper.current) {
        headerWrapper.current.classList.remove(styles['open']);
        headerWrapper.current.setAttribute('aria-expanded', 'false');
      }
      document.body.classList.remove('no-scroll');
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    // Remove the open class and aria-expanded attribute when the screen is resized
    const handleMediaChange = (e) => {
      if (e.matches && headerWrapper.current) {
        headerWrapper.current.classList.remove(styles['open']);
        headerWrapper.current.removeAttribute('aria-expanded');
      }
    }
    mediaQuery.addEventListener('change', handleMediaChange);

    // Close mobile nav when user clicks a nav link (not lang switcher)
    const handleLinkClick = (e) => {
      // Skip lang switcher clicks - let them navigate without closing animation
      if (e.currentTarget.closest('[class*="lang-switcher"]') || e.currentTarget.closest('[class*="lang-toggle"]')) {
        return;
      }
      if(headerWrapper.current.getAttribute('aria-expanded')==='true'){
          toggleMobileNav();
      }
    };

    const links = headerWrapper.current.querySelectorAll('nav a');
    links.forEach(item => {
      item.addEventListener('click', handleLinkClick);
    });

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      links.forEach(item => {
        item.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);

  return (
    <header className={`${styles['main-header']}`} ref={headerWrapper}>
      <div className={styles["container"]}>
        <Link href="/" className={styles['fm-logo']}>
          <Image
            src={logo?.image || "/images/logo-fm.svg"}
            alt={logo?.alt || "Fabian Miranda | Creative Technologist"}
            width={logo?.width || 160}
            height={logo?.height || 52}
          />
        </Link>
        <nav>
            <div className={`${styles['nav-panel']} navPanel`}>
              <ul>
                {navigation && navigation.map((item, index) => (
                  <li key={index}>
                    <Link href={item.url} className={isActive(item.url) ? styles.active : ''}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className={styles['lang-switcher-mobile']}>
                  <a href={getLanguageSwitchHref()} onClick={handleMobileLangSwitch} className={styles['lang-toggle']} aria-label={altLocale === 'es' ? 'Cambiar a Español' : 'Switch to English'}>
                    <Globe className={styles['lang-icon']} />
                    <span lang={altLocale}>{altLocale === 'es' ? 'Español' : 'English'}</span>
                  </a>
                </li>
              </ul>
            </div>

            <button className={styles['close-btn']} onClick={toggleMobileNav} aria-label="Toggle navigation menu">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>

        </nav>
        <Link href={getLanguageSwitchHref()} locale={altLocale} className={`${styles['lang-toggle']} ${styles['lang-desktop']}`} aria-label={altLocale === 'es' ? 'Cambiar a Español' : 'Switch to English'}>
          <Globe className={styles['lang-icon']} />
          <span lang={altLocale}>{altLocale === 'es' ? 'Español' : 'English'}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
