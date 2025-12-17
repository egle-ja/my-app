'use client';

import { UpdateProductInput, updateProductSchema } from '@/lib/validation';
import { updateProduct } from '@/actions/products';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductWrapper } from '@/types/global';
import FileInput from '@/components/form/fileInput';
import TextInput from '@/components/form/textInput';
import TextAreaInput from '@/components/form/textAreaInput';
import SelectInput from '@/components/form/selectInput';
import { Category, Condition } from '@/prisma/generated/enums';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import imagePlaceholder from '@/assets/image-placeholder.svg';
import styles from './products.module.css';

export default function ProductItem({ product }: ProductWrapper) {
  const [isEditing, setIsEditing] = useState(false);
  const [displayImage, setDisplayImage] = useState<string | null>(
    product.image ?? null,
  );

  const methods = useForm<UpdateProductInput>({
    resolver: zodResolver(updateProductSchema),
    mode: 'onChange',
    defaultValues: {
      title: product.title,
      category: product.category,
      condition: product.condition,
      price: (product.price / 100).toFixed(2),
      description: product.description,
      image: product.image,
    },
  });

  const onSubmit = async (data: UpdateProductInput) => {
    // optimistically update image
    if (data.image instanceof File) {
      const objectUrl = URL.createObjectURL(data.image);
      setDisplayImage(objectUrl);
    }

    const result = await updateProduct(product.id, data);

    if (result.status === 'error') {
      toast.error(result.message);
      // revert image on error
      setDisplayImage(product.image ?? null);
    } else {
      toast.success(result.message);
      setIsEditing(false);
    }
  };

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  useEffect(() => {
    console.log('formstate', methods.formState);
    console.log('validating', methods.formState.isValidating);
  }, [methods.formState]);
  return (
    <>
      {!isEditing && (
        <>
          <div className={styles.imageWrapper}>
            <Image
              src={displayImage || imagePlaceholder.src}
              alt="Product image"
              fill
              className={styles.image}
            />
          </div>
          <div>{product.title}</div>
          <div>{product.category}</div>
          <div>{product.price}</div>
          <div>{product.condition}</div>
          <div>{product.description}</div>
          <div>{product.location}</div>
        </>
      )}
      {isEditing && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FileInput name="image" defaultImage={product.image} />
            <TextInput name="title" placeholder="Enter your product title" />
            <TextInput name="price" placeholder="00.00" />
            <SelectInput name="category" options={Object.values(Category)} />
            <SelectInput name="condition" options={Object.values(Condition)} />
            <TextAreaInput
              name="description"
              placeholder="Description..."
              rows={3}
            />
            <button
              type="submit"
              disabled={
                methods.formState.isSubmitting || methods.formState.isValidating
                // !methods.formState.isDirty
              }
            >
              {methods.formState.isSubmitting ? 'Loading...' : 'Update Product'}
            </button>
          </form>
        </FormProvider>
      )}
      {!isEditing && <button onClick={handleEdit}>Edit</button>}
      {isEditing && <button onClick={handleCancel}>Cancel</button>}
    </>
  );
}
