'use client';

import styles from './products.module.css';
import { deleteProduct } from '@/actions/products';
import { Product } from '@/prisma/generated/client';
import ProductListItem from '@/components/products/product-list-item';
import Image from 'next/image';
import trash from '@/assets/trash.svg';
import { toast } from 'react-toastify';
import { getSortedProducts } from '@/lib/utils';

interface ProductWrapper {
  products: Product[];
}

export default function ProductList({ products }: ProductWrapper) {
  const sortedProducts = getSortedProducts(products);

  async function handleDelete(formData: FormData) {
    const data = await deleteProduct(formData);

    if (data.status === 'error') {
      toast.error(data.message);
    } else {
      toast.success(data.message);
    }
  }

  return (
    <ul className={styles.products}>
      {sortedProducts.map((product) => (
        <li key={product.id}>
          <ProductListItem product={product} />
          <form className={styles.delete} action={handleDelete}>
            <input type="hidden" name="id" value={product.id} />
            <button type="submit">
              <Image src={trash.src} alt="Delete item" width={18} height={18} />
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}
