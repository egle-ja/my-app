import { Product } from '@/prisma/generated/client';

export type FormStateType = {
  errors: ProductFormFieldErrors;
};

export type ProductFormFieldErrors = {
  [K in keyof Product]?: string;
};

export enum Status {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type FormResponse = {
  status: Status.SUCCESS | Status.ERROR;
  message: string;
};
