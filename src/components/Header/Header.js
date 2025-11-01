import Image from "next/image";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";

const Header = ({ logo, navigation }) => {

  const router = useRouter();
  const headerWrapper = useRef(null);
  const q = gsap.utils.selector(headerWrapper);
  const isActive = (path) => router.pathname === path;

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
        q('.navPanel')[0].removeAttribute('style')
      }}, '-=0.0');
    }
  }

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

    // Close mobile nav when user clicks the same page
    headerWrapper.current.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', (e) => {
        console.log(e.currentTarget.getAttribute('href'), router.pathname);
        if( 
          e.currentTarget.getAttribute('href') === router.pathname && 
          headerWrapper.current.getAttribute('aria-expanded')==='true'
        ){
            toggleMobileNav();
        }
      });
    });
    
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
