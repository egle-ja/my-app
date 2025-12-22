'use client';

import { UpdateProductInput, updateProductSchema } from '@/lib/validation';
import { updateProduct } from '@/actions/products';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductWrapper } from '@/types/global';
import FileInput from '@/components/form/fileInput';
import TextInput from '@/components/form/textInput';
import SelectInput from '@/components/form/selectInput';
import { Category, Condition } from '@/prisma/generated/enums';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Dispatch, SetStateAction } from 'react';

interface EditProductFormProps extends ProductWrapper {
  setDisplayImage: Dispatch<SetStateAction<string | null>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  handleCancel: () => void;
}

export default function EditProductForm({
  product,
  setDisplayImage,
  setIsEditing,
  handleCancel,
}: EditProductFormProps) {
  const methods = useForm<UpdateProductInput>({
    resolver: zodResolver(updateProductSchema),
    mode: 'onChange',
    defaultValues: {
      title: product.title,
      category: product.category,
      condition: product.condition,
      price: (product.price / 100).toFixed(2),
      description: product.description,
      image: product.image ?? undefined,
    },
  });

  const onSubmit = async (data: UpdateProductInput) => {
    // optimistically update image
    // TODO update all fields optimistically if edit modal stays
    console.log('f', methods.formState.isSubmitting);
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    maxHeight: '80vh',
    p: 4,
    overflow: 'scroll',
  };
  const { isSubmitting, isDirty, isValid } = methods.formState;

  return (
    <Modal
      open
      onClose={handleCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FileInput name="image" defaultImage={product.image} />
            <TextInput name="title" placeholder="Enter your product title" />
            <TextInput name="price" placeholder="00.00" />
            <SelectInput name="category" options={Object.values(Category)} />
            <SelectInput name="condition" options={Object.values(Condition)} />
            <TextInput
              rows={4}
              name="description"
              placeholder="Description..."
            />
            <button
              className="button"
              type="submit"
              disabled={!isDirty || !isValid || isSubmitting}
            >
              {methods.formState.isSubmitting ? 'Loading...' : 'Update Product'}
            </button>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
}
