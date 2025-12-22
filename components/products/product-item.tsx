'use client';

import { ProductWrapper } from '@/types/global';
import Image from 'next/image';
import imagePlaceholder from '@/assets/image-placeholder.svg';
import styles from './products.module.css';

interface ProductItemProps extends ProductWrapper {
  displayImage?: string | null;
}

export default function ProductItem({
  product,
  displayImage,
}: ProductItemProps) {
  return (
    <div className={styles.productPreview}>
      <div
        className={`${styles.imageWrapper} ${styles.imageWrapperSingleItem}`}
      >
        <Image
          src={displayImage || imagePlaceholder.src}
          alt="Product image"
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.productPreviewDescription}>
        <div>{product.title}</div>
        <div>{product.category}</div>
        <div>{product.price}</div>
        <div>{product.condition}</div>
        <div>{product.description}</div>
        <div>{product.location}</div>
      </div>
    </div>
  );
}
