import { getProduct, updateProductNew } from '@/actions/products';
import EditProductFormNew from '@/components/products/edit-product-for-new';
import { mapProductToFormValues } from '@/lib/utils';

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

  const formValues = mapProductToFormValues(product);

  return <EditProductFormNew action={updateProductNew} values={formValues} />;
}
