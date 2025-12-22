import { Product } from '@/prisma/generated/client';
import { getProducts } from '@/actions/products';
import Link from 'next/link';
import Products from '@/components/products/products';

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <section>
      <div className="heading heading-with-controls">
        <h2>All products</h2>
        <Link className="button" href="/add">
          Add a product
        </Link>
      </div>
      <Products products={products} />
    </section>
  );
}
