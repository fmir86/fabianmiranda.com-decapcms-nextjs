import Image from "next/image";
import styles from "./Header.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <header className={`${styles['main-header']}`}>
      <div className={styles["container"]}>
        <Link href="/">
          <Image src="/images/logo-fm.svg" alt="Fabian Miranda | Creative Technologist" width={160} height={52} />
        </Link>
        <nav>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/about">Services</Link></li>
              <li><Link href="/about">Portfolio</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
