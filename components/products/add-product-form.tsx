'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductInput, createProductSchema } from '@/lib/validation';
import TextInput from '@/components/form/textInput';
import SelectInput from '@/components/form/selectInput';
import FileInput from '@/components/form/fileInput';
import { Category, Condition } from '@/prisma/generated/enums';
import { addProduct } from '@/actions/products';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import TextAreaInput from '@/components/form/textAreaInput';

export default function AddProductForm() {
  const router = useRouter();
  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: CreateProductInput) => {
    const result = await addProduct(data);
    if (result.status === 'error') {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      router.push('/');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput name="title" placeholder="Enter your product title" />
        <TextInput name="price" placeholder="00.00" />
        <SelectInput name="category" options={Object.values(Category)} />
        <SelectInput name="condition" options={Object.values(Condition)} />
        <TextAreaInput
          name="description"
          placeholder="Description..."
          rows={3}
        />
        <FileInput name="image" />
        <button type="submit" disabled={methods.formState.isSubmitting}>
          {methods.formState.isSubmitting ? 'Loading...' : 'Add Product'}
        </button>
      </form>
    </FormProvider>
  );
}
