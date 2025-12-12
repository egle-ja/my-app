import styles from './header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.svg';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          priority
          width={200}
          height={40}
          className={styles.logo}
          src={logo.src}
          alt="Logo"
        />
      </Link>
    </header>
  );
}
