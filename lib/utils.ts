import { Product } from '@/prisma/generated/client';
import { getProduct } from '@/actions/products';
import { UpdateProductWithIdInput } from '@/lib/validation';

export function getConvertedPrice(price: string | number) {
  if (typeof price === 'string') {
    return price;
  }
  return (price / 100).toFixed(2);
}

export function getSortedProducts(items: Product[]) {
  return items.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function capitalize(string: string): string {
  return String(string[0]).toUpperCase() + String(string).slice(1);
}

export function mapProductToFormValues(
  product: Product,
): UpdateProductWithIdInput {
  return {
    id: product.id,
    title: product.title,
    price: (product.price / 100).toFixed(2),
    category: product.category,
    condition: product.condition,
    description: product.description,
    image: product.image ?? undefined,
  };
}
