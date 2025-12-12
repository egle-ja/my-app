'use client';

import styles from './products.module.css';
import { deleteProduct } from '@/lib/products';
import { Product } from '@/prisma/generated/client';
import ProductItem from '@/components/products/product-item';
import Image from 'next/image';
import trash from '@/assets/trash.svg';
import { toast } from 'react-toastify';

interface ProductWrapper {
  products: Product[];
}

function getSortedProducts(items: Product[]) {
  return items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
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
          <ProductItem product={product} />
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
