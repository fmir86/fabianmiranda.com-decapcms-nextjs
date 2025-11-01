import '../styles/globals.scss';
import { MainProvider } from "../context/MainContext";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <MainProvider>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
      <GoogleAnalytics gaId="G-K1B972PYHJ" />
    </MainProvider>
  );
}