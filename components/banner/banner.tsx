import Image from 'next/image';
import banner from '@/assets/banner.jpeg';
import styles from './banner.module.css';
import Link from 'next/link';

export default function Banner() {
  return (
    <div className={styles.banner}>
      <Image className={styles.image} src={banner} alt="banner" fill />
      <h1 className={styles.heading}>Welcome to this website</h1>
      <p className={styles.description}>
        This is a website to add, delete and edit fake products.
      </p>
      <div className={styles.controls}>
        <Link className="button-link" href="/products">
          Explore
        </Link>
        <Link className={`${styles.add} button-link`} href="/add">
          Add
        </Link>
      </div>
    </div>
  );
}
