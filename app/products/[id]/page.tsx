import { getProduct } from '@/lib/products';

// @ts-ignore
export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return <>sorry</>;
  }
  return (
    <div>
      <div>{product.title}</div>
      <div>{product.category}</div>
      <div>{product.price}</div>
      <div>{product.condition}</div>
      <div>{product.description}</div>
      <div>{product.location}</div>
    </div>
  );
}
