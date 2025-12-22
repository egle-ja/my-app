'use client';

import styles from './products.module.css';
import imagePlaceholder from '@/assets/image-placeholder.svg';
import location from '@/assets/location.svg';
import Image from 'next/image';
import Link from 'next/link';
import { ProductWrapper } from '@/types/global';
import { getConvertedPrice } from '@/lib/utils';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { toggleFavourite } from '@/actions/products';
import { startTransition, useOptimistic } from 'react';

export default function ProductListItem({ product }: ProductWrapper) {
  const price = getConvertedPrice(product.price);

  const [isOptimisticLiked, toggleOptimistic] = useOptimistic<boolean, void>(
    product.isLiked,
    (state) => !state,
  );

  const handleToggle = () => {
    startTransition(async () => {
      toggleOptimistic();

      try {
        await toggleFavourite(product.id, product);
      } catch {
        toggleOptimistic();
      }
    });
  };

  return (
    <>
      <Link href={`/products/${product.id}`} className={styles.product}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={product.image || imagePlaceholder.src}
            alt={product.title}
            fill
          />
        </div>
      </Link>
      <div className={styles.heading}>
        <Link href={`/products/${product.id}`} className={styles.product}>
          <p>{product.title}</p>
        </Link>

        <IconButton
          className={styles.like}
          aria-label="Like"
          onClick={handleToggle}
        >
          {isOptimisticLiked ? (
            <FavoriteOutlinedIcon />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </IconButton>
        {/*<button className={styles.like}>*/}
        {/*  <Image src={heart.src} alt="Like" width={18} height={18} />*/}
        {/*</button>*/}
      </div>
      <Link href={`/products/${product.id}`} className={styles.product}>
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
    </>
  );
}
