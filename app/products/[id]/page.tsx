import { getProduct } from '@/actions/products';

import ProductItem from '@/components/products/product-item';

interface ProductPageProps {
  params: {
    id: string;
  };
}
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return <>sorry</>;
  }
  return (
    <>
      <ProductItem product={product} />
    </>
  );
}
