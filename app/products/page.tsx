import ProductList from '@/components/products/product-list';
import { Product } from '@/prisma/generated/client';
import { getProducts } from '@/lib/products';
import Link from 'next/link';

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <section>
      <div className="heading heading-with-controls">
        <h2>All products</h2>
        <Link className="button-link" href="/add">
          Add a product
        </Link>
      </div>
      <ProductList products={products} />
    </section>
  );
}
