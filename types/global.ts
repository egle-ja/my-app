import { Product } from '@/prisma/generated/client';

export enum Status {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type FormResponse = {
  status: Status.SUCCESS | Status.ERROR;
  message: string;
};

export interface ProductWrapper {
  product: Product;
}
