import Head from "next/head";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Inter } from 'next/font/google';
import styles from "./Layout.module.scss";
import { useEffect } from "react";

const inter = Inter({ subsets: ['latin'] })

const Layout = ({ children }) => {

  useEffect(() => {
    document.body.classList.remove('no-scroll');
  }, []);

  return (
    <div className={styles['main-layout']}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Header />

      <main className={`${inter.className}`}>
        {children}
      </main>

      <Footer/>
    </div>
  );
};

export default Layout;
