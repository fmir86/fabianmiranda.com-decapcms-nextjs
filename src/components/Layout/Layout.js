import Head from "next/head";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BackToTop from "../BackToTop/BackToTop";
import styles from "./Layout.module.scss";
import { useEffect } from "react";

const Layout = ({ children, headerData, footerData }) => {

  useEffect(() => {
    document.body.classList.remove('no-scroll');
  }, []);

  // Global anchor link interceptor for smooth scrolling with header offset
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      
      // Check if it's an anchor link (starts with # and is internal)
      if (target && target.getAttribute('href')?.includes('#')) {
        const href = target.getAttribute('href');
        const targetId = href.split('#')[1];
        
        // Function to find element with multiple strategies
        const findTargetElement = () => {
          return (
            document.getElementById(targetId) ||
            document.querySelector(`#${targetId}`) ||
            document.querySelector(`[data-section="${targetId}"]`) ||
            document.querySelector(`.${targetId}`) ||
            document.querySelector(`[id="${targetId.toLowerCase()}"]`) ||
            document.querySelector(`[id*="${targetId}"]`) ||
            document.querySelector(`section.${targetId}`) ||
            document.querySelector(`[name="${targetId}"]`)
          );
        };
        
        let targetElement = findTargetElement();
        
        // If element not found immediately, try after a short delay (React hydration)
        if (!targetElement) {
          
          const tryTimes = [100, 300, 500, 1000];
          
          const tryFindElement = async () => {
            for (const delay of tryTimes) {
              await new Promise(resolve => setTimeout(resolve, delay));
              targetElement = findTargetElement();
              
              if (targetElement) {
                break;
              }
            }
            
            if (targetElement) {
              scrollToElement(targetElement, targetId);
            } 
          };
          
          e.preventDefault();
          tryFindElement();
          return;
        }
        
        // Element found immediately
        e.preventDefault();
        scrollToElement(targetElement, targetId);
      }
    };
    
    // Helper function to handle the actual scrolling
    const scrollToElement = (targetElement, targetId) => {
      // Calculate header height dynamically
      const header = document.querySelector('header') || document.querySelector('[role="banner"]');
      const headerHeight = header ? header.offsetHeight : 80;
      const offset = headerHeight + 20;
      
      // Calculate target position
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
      
      console.log('✅ Scrolling to:', {
        targetId,
        headerHeight,
        offset,
        targetPosition,
        currentScroll: window.pageYOffset
      });
      
      // Smooth scroll to target
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without triggering default behavior
      if (history.pushState) {
        history.pushState(null, null, `#${targetId}`);
      }
    };

    // Add event listener to document
    document.addEventListener('click', handleAnchorClick);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className={styles['main-layout']}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Favicons and PWA */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Fabian Miranda" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme color for browser UI */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)" />
      </Head>

      <Header
        logo={headerData?.logo}
        navigation={headerData?.navigation}
      />

      <main>
        {children}
      </main>

      <Footer
        navigation={footerData?.navigation}
        socialLinks={footerData?.socialLinks}
        copyright={footerData?.copyright}
      />

      <BackToTop />
    </div>
  );
};

export default Layout;
