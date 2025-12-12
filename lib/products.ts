'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Category, Condition, Product } from '@/prisma/generated/client';
import { redirect } from 'next/navigation';
import {
  FormResponse,
  FormStateType,
  ProductFormFieldErrors,
  Status,
} from '@/types/global';
import { ProductInput, productSchema } from '@/lib/validation';

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany();
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function addProduct(data: ProductInput): Promise<FormResponse> {
  try {
    const validation = productSchema.safeParse(data);

    if (!validation.success) throw new Error('Invalid data');

    const { title, category, condition, description, price } = validation.data;
    //continue to use the data

    const rawPrice = price;

    if (typeof rawPrice !== 'string' || !rawPrice) {
      console.log('Price missing or invalid');
    }
    const priceInCents = Math.round(parseFloat(rawPrice as string) * 100);

    // if (Object.keys(errors).length > 0) {
    //   return { errors };
    // }

    await prisma.product.create({
      data: {
        title,
        category,
        condition,
        price: priceInCents,
        description,
      },
    });
    revalidatePath('/');

    return {
      status: Status.SUCCESS,
      message: `Product ${title} added successfully`,
    };
  } catch (error) {
    console.error('e', error);
    return {
      status: Status.ERROR,
      message: 'Product could not be added',
    };
  }

  // redirect('/');
}

export async function deleteProduct(formData: FormData) {
  try {
    const id = formData.get('id') as string;

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath('/');

    return {
      status: Status.SUCCESS,
      message: 'Product deleted successfully',
    };
  } catch (error) {
    return {
      status: Status.ERROR,
      message: 'Product could not be deleted',
    };
  }
}

export async function addProductForUseActionState(
  prevState: FormStateType,
  queryData: FormData,
): Promise<FormStateType> {
  const title = queryData.get('title') as string;
  const category = queryData.get('category') as Category;
  const condition = queryData.get('condition') as Condition;
  const description = queryData.get('description') as string;

  const errors: ProductFormFieldErrors = {};

  if (!title || title.trim().length === 0) {
    errors.title = 'Please enter title';
  }

  if (!category) {
    errors.category = 'Please select category';
  }

  if (!condition) {
    errors.condition = 'Please select condition';
  }

  if (!description) {
    errors.description = 'Please enter description';
  }

  const rawPrice = queryData.get('price');

  if (typeof rawPrice !== 'string' || !rawPrice) {
    errors.price = 'Price missing or invalid';
  }
  const priceInCents = Math.round(parseFloat(rawPrice as string) * 100);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await prisma.product.create({
    data: {
      title,
      category,
      condition,
      price: priceInCents,
      description,
    },
  });

  revalidatePath('/');
  redirect('/');
}
