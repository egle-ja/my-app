'use client';

import { addProduct } from '@/lib/products';
import { Category, Condition } from '@/prisma/generated/enums';
import { useActionState, useState, useTransition } from 'react';
import { FormStateType, ProductFormFieldErrors } from '@/types/global';
import styles from './products.module.css';
import { ProductInput, productSchema } from '@/lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

export default function AddProductForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
  });
  const [isPending, startTransition] = useTransition();

  // const onSubmit = async (data: ProductInput) => {
  //   console.log(data);
  //   await addProduct(data);
  // };
  async function onSubmit(values: z.infer<typeof productSchema>) {
    startTransition(async () => {
      const data = await addProduct(values);
      if (data.status === 'error') {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        router.push('/'); // client-side redirect
      }
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="title"
        placeholder="Enter your product title"
        {...register('title')}
      />
      {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      <select id="category" {...register('category')}>
        <option value="">Select category...</option>
        {Object.values(Category).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      {errors.category && (
        <p className={styles.error}>{errors.category.message}</p>
      )}
      <select id="condition" {...register('condition')}>
        <option value="">Select condition...</option>
        {Object.values(Condition).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      {errors.condition && (
        <p className={styles.error}>{errors.condition.message}</p>
      )}
      <input
        id="price"
        type="text"
        placeholder="00.00"
        inputMode="decimal"
        {...register('price')}
      />
      {errors.price && <p className={styles.error}>{errors.price.message}</p>}
      <textarea
        id="description"
        placeholder="Write your descripation here..."
        rows={6}
        {...register('description')}
      />
      {errors.description && (
        <p className={styles.error}>{errors.description.message}</p>
      )}
      <button type="submit">{isPending ? 'Loading' : 'Add product'}</button>
    </form>
  );
}
