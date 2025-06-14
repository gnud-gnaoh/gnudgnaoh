'use client';

import Link from "next/link";
import Container from "../components/Container";
import { usePathname } from "next/navigation";
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      <Container>
        <nav className={styles.nav}> 
          <Link 
            href="/"
            className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
          >
            about
          </Link>
          
          <Link 
            href="/posts"
            className={`${styles.link} ${pathname === '/posts' ? styles.active : ''}`}
          >
            posts
          </Link>
        </nav>
      </Container>
    </header>
  )
}
