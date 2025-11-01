import '../styles/globals.scss';
import { MainProvider } from "../context/MainContext";
import { GoogleAnalytics } from '@next/third-parties/google';

export default function App({ Component, pageProps }) {
  return (
    <MainProvider>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-K1B972PYHJ" />
    </MainProvider>
  );
}