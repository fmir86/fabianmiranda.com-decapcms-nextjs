import '../styles/globals.scss';
import { MainProvider } from "../context/MainContext";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  const [loadAnalytics, setLoadAnalytics] = useState(false);

  useEffect(() => {
    // Defer GA loading until user interaction or after 3 seconds
    const enableAnalytics = () => setLoadAnalytics(true);

    const timeout = setTimeout(enableAnalytics, 3000);

    window.addEventListener('scroll', enableAnalytics, { once: true, passive: true });
    window.addEventListener('click', enableAnalytics, { once: true });
    window.addEventListener('keydown', enableAnalytics, { once: true });
    window.addEventListener('touchstart', enableAnalytics, { once: true, passive: true });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', enableAnalytics);
      window.removeEventListener('click', enableAnalytics);
      window.removeEventListener('keydown', enableAnalytics);
      window.removeEventListener('touchstart', enableAnalytics);
    };
  }, []);

  return (
    <MainProvider>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
      {loadAnalytics && <GoogleAnalytics gaId="G-K1B972PYHJ" />}
    </MainProvider>
  );
}