import { Product } from '@/prisma/generated/client';

export function getConvertedPrice(product: Product) {
  return (product.price / 100).toFixed(2);
}

export function getSortedProducts(items: Product[]) {
  return items.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}
