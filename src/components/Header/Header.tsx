import imageLogo from "../../../public/images/logo.svg";
import Image from "next/image";
import styles from "./Header.module.scss";
import { SignInButton } from "../SignInButton/SignInButton";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={imageLogo} alt="Woman in computer" />
        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>
        <SignInButton/>
      </div>
    </header>
  );
}
