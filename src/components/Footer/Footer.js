import Image from "next/image";
import styles from "./Footer.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";




const Header = () => {
  return (
    <footer className={`${styles['main-footer']}`}>
      <div className={styles["container"]}>

        <Link href="/">
          <svg width="50" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 50.3 49.2" fill="currentColor">
            <path stroke-width="0" fill="currentColor" d="M45.4,0H4C1.9,0,0,1.9,0,4v29.5l6.2-15h0l3.8-9.2c.5-1.3,2.2-2.4,3.9-2.4h35.3l-4.3,9.2c-.5,1.3-2.2,2.4-3.9,2.4h-19.7l-3.1,7.7h16.2l-4.3,9.2c-.5,1.3-2.2,2.3-3.9,2.3h-12.7l-3.9,9.9c-.2.5-.5.8-.9,1.6h37c2.1,0,3.9-1.8,3.9-3.9V4c0-2.1-1.8-4-3.9-4h-.3Z"/>
          </svg>
        </Link>

        <nav className={styles['subnav']}>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/about">Services</Link></li>
              <li><Link href="/about">Portfolio</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
        </nav>
            
        <p className="my-6">
          <Link href="https://github.com/fmir86" target="_blank" rel="noopener noreferrer" className="social-icon" title="Github">
            <FontAwesomeIcon icon={faSquareGithub} size="2x"/>
          </Link>
          <Link href="https://www.linkedin.com/in/fmir86/" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} size="2x"/>
          </Link>
          <a href="mailto:me@fabianmiranda.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Email">
            <FontAwesomeIcon icon={faEnvelopeSquare} size="2x"/>
          </a>
        </p>
            
        <p>© 2024 | FABIANMIRANDA.COM | ALL RIGHTS RESERVED</p>

      </div>
    </footer>
  );
};

export default Header;
