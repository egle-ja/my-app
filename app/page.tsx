import { getProducts } from '@/lib/products';
import { Product } from '@/prisma/generated/client';
import ProductList from '@/components/products/product-list';
import Banner from '@/components/banner/banner';
import Link from 'next/link';
import styles from '@/components/banner/banner.module.css';

export default async function HomePage() {
  const products: Product[] = await getProducts();

  return (
    <>
      <Banner />
      <section>
        <div className="heading heading-with-controls">
          <h2>Newest products</h2>
          <Link className="button-link" href="/products">
            Explore all
          </Link>
        </div>
        <ProductList products={products} />
      </section>
    </>
  );
}
