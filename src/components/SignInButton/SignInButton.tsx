import styles from "./SignInButton.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from 'next-auth/client'

export function SignInButton() {
  const [session] = useSession();
 
  return session ? (
    <button type="button" className={styles.button} onClick={() => signOut()}>
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737388" className={styles.closeIcon}/>
    </button>
  ) : (
    <button type="button" className={styles.button} onClick={() => signIn('github')}>
      <FaGithub color="#EBA417" />
      Sign In in GitHub
    </button>
  );
}
