import { Product } from '@/prisma/generated/client';
import styles from './products.module.css';
import heart from '@/assets/heart.svg';
import location from '@/assets/location.svg';
import Image from 'next/image';
import Link from 'next/link';

interface ProductWrapper {
  product: Product;
}

export default function ProductItem({ product }: ProductWrapper) {
  const convertedPrice = (product.price / 100).toFixed(2);
  return (
    <Link href={`/products/${product.id}`} className={styles.product}>
      <div className={styles.image}></div>
      <div className={styles.heading}>
        <p>{product.title}</p>
        <button className={styles.like}>
          <Image src={heart.src} alt="Like" width={18} height={18} />
        </button>
      </div>
      <div className={styles.description}>
        <p>{product.category}</p>
        <p className={styles.price}>
          {convertedPrice} {product.currency}
        </p>
        {/*<p>{product.condition}</p>*/}
        {/*<p>{product.description}</p>*/}
        <div className={styles.location}>
          <Image
            src={location.src}
            alt="Location icon"
            width={18}
            height={18}
          />
          <p>{product.location}</p>
        </div>
      </div>
    </Link>
  );
}
