import { Product } from '@/prisma/generated/client';

export enum Status {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum ProductListMode {
  ALL = 'All',
  FAVOURITES = 'Favourites',
}

export type FormResponse = {
  status: Status.SUCCESS | Status.ERROR;
  message: string;
};

export interface ProductWrapper {
  product: Product;
}

export interface ProductsWrapper {
  products: Product[];
}
