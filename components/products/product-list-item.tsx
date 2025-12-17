import styles from './products.module.css';
import heart from '@/assets/heart.svg';
import imagePlaceholder from '@/assets/image-placeholder.svg';
import location from '@/assets/location.svg';
import Image from 'next/image';
import Link from 'next/link';
import { ProductWrapper } from '@/types/global';
import { getConvertedPrice } from '@/lib/utils';

export default function ProductListItem({ product }: ProductWrapper) {
  const price = getConvertedPrice(product);

  return (
    <Link href={`/products/${product.id}`} className={styles.product}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={product.image || imagePlaceholder.src}
          alt={product.title}
          fill
        />
      </div>
      <div className={styles.heading}>
        <p>{product.title}</p>
        <button className={styles.like}>
          <Image src={heart.src} alt="Like" width={18} height={18} />
        </button>
      </div>
      <div className={styles.description}>
        <p>{product.category}</p>
        <p className={styles.price}>
          {price} {product.currency}
        </p>
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
