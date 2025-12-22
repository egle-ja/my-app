'use client';

import { FormProvider, useForm } from 'react-hook-form';
import {
  UpdateProductWithIdInput,
  updateProductWithIdSchema,
} from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import FileInput from '@/components/form/fileInput';
import TextInput from '@/components/form/textInput';
import SelectInput from '@/components/form/selectInput';
import { Category, Condition } from '@/prisma/generated/enums';
import { useActionState, useEffect } from 'react';
import { getConvertedPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

type ActionState = {
  errors: ReturnType<typeof z.flattenError>['fieldErrors'];
  values: UpdateProductWithIdInput;
  success?: boolean;
};

export default function EditProductFormNew({
  action,
  values,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  values: UpdateProductWithIdInput;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(action, {
    values,
    errors: {},
    success: false,
  });

  const { price, ...rest } = state.values;

  const methods = useForm<UpdateProductWithIdInput>({
    resolver: zodResolver(updateProductWithIdSchema),
    mode: 'onChange',
    errors: state.errors,
    defaultValues: { ...rest, price: getConvertedPrice(price) },
  });

  useEffect(() => {
    if (state.success) {
      toast.success('Product updated successfully!');
      router.push('/');
    }
  }, [state.success, router]);

  const { isValid } = methods.formState;

  return (
    <FormProvider {...methods}>
      <form action={formAction}>
        <FileInput
          name="image"
          defaultImage={
            typeof values.image === 'string' ? values.image : undefined
          }
        />
        <TextInput name="title" placeholder="Enter your product title" />
        <TextInput name="price" placeholder="00.00" />
        <SelectInput name="category" options={Object.values(Category)} />
        <SelectInput name="condition" options={Object.values(Condition)} />
        <TextInput rows={4} name="description" placeholder="Description..." />
        <input type="hidden" name="id" value={values.id} />
        <button
          className="button"
          type="submit"
          disabled={isPending || !isValid}
        >
          {isPending ? 'Saving...' : 'Update Product'}
        </button>
      </form>
    </FormProvider>
  );
}
