import Image from "next/image";
import styles from "./Footer.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";




const Footer = ({ navigation, socialLinks, copyright }) => {
  // Map icon names to FontAwesome icons
  const iconMap = {
    faSquareGithub,
    faLinkedin,
    faEnvelopeSquare
  };

  return (
    <footer className={`${styles['main-footer']}`}>
      <div className={styles["container"]}>

        <Link href="/" aria-label="Link to homepage">
          <svg width="50" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 50.3 49.2" fill="currentColor">
            <path strokeWidth="0" fill="currentColor" d="M45.4,0H4C1.9,0,0,1.9,0,4v29.5l6.2-15h0l3.8-9.2c.5-1.3,2.2-2.4,3.9-2.4h35.3l-4.3,9.2c-.5,1.3-2.2,2.4-3.9,2.4h-19.7l-3.1,7.7h16.2l-4.3,9.2c-.5,1.3-2.2,2.3-3.9,2.3h-12.7l-3.9,9.9c-.2.5-.5.8-.9,1.6h37c2.1,0,3.9-1.8,3.9-3.9V4c0-2.1-1.8-4-3.9-4h-.3Z"/>
          </svg>
        </Link>

        <nav className={styles['subnav']}>
            <ul>
              {navigation && navigation.map((item, index) => (
                <li key={index}>
                  <Link href={item.url}>{item.label}</Link>
                </li>
              ))}
            </ul>
        </nav>

        <div className={styles['social-icons-row']}>
          {socialLinks && socialLinks.map((link, index) => {
            const icon = iconMap[link.icon];
            const isEmail = link.url.startsWith('mailto:');

            if (isEmail) {
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  title={link.platform}
                >
                  {icon && <FontAwesomeIcon icon={icon} size="2x"/>}
                </a>
              );
            }

            return (
              <Link
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title={link.platform}
              >
                {icon && <FontAwesomeIcon icon={icon} size="2x"/>}
              </Link>
            );
          })}
        </div>

        <p>{copyright || "© 2024 | FABIANMIRANDA.COM | ALL RIGHTS RESERVED"}</p>

      </div>
    </footer>
  );
};

export default Footer;
