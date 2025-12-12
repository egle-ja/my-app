import AddProductForm from '@/components/products/add-product-form';
import Link from 'next/link';

export default function AddPage() {
  return (
    <section>
      <div className="heading heading-with-controls">
        <h2>Add a product</h2>
        <Link className="button-link" href="/products">
          Explore all
        </Link>
      </div>
      <AddProductForm />
    </section>
  );
}
