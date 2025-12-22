'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Product } from '@/prisma/generated/client';
import { FormResponse, Status } from '@/types/global';
import {
  CreateProductInput,
  createProductSchema,
  UpdateProductInput,
  UpdateProductWithIdInput,
  updateProductWithIdSchema,
} from '@/lib/validation';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import { z, ZodError } from 'zod';

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany();
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function addProduct(
  data: CreateProductInput,
): Promise<FormResponse> {
  const serverSchema = createProductSchema.omit({ image: true });
  const { image, ...rest } = data;
  try {
    const validation = serverSchema.safeParse(rest);
    if (!validation.success) {
      throw new Error('Invalid data');
    }

    if (!image || !image.size) {
      throw new Error('Image missing');
    }

    const rawPrice = validation.data.price;

    const priceInCents = Math.round(parseFloat(rawPrice as string) * 100);

    let uploadedImage;

    try {
      uploadedImage = await uploadImage(image);
    } catch (error) {
      // console.log(error);

      throw new Error('Failed to upload image');
    }

    await prisma.product.create({
      data: {
        title: validation.data.title,
        category: validation.data.category,
        condition: validation.data.condition,
        description: validation.data.description,
        price: priceInCents,
        image: uploadedImage.imageUrl,
        imagePublicId: uploadedImage.publicId,
      },
    });
    revalidatePath('/');

    return {
      status: Status.SUCCESS,
      message: `Product ${validation.data.title} added successfully`,
    };
  } catch (error) {
    console.error('e', error);

    return {
      status: Status.ERROR,
      message: 'Product could not be added',
    };
  }
}

export async function deleteProduct(formData: FormData) {
  try {
    const id = formData.get('id') as string;
    const product = await prisma.product.findUnique({ where: { id: id } });

    if (product?.imagePublicId) {
      await deleteImage(product.imagePublicId);
    }

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

type ActionState = {
  errors: ReturnType<typeof z.flattenError>['fieldErrors'];
  values: UpdateProductWithIdInput;
  success?: boolean;
};

export async function updateProductNew(
  state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const serverSchema = updateProductWithIdSchema;
  const data = Object.fromEntries(formData);
  const validation = serverSchema.safeParse(data);

  try {
    if (!validation.success) {
      console.log(z.flattenError(validation.error).fieldErrors);
      return {
        values: state.values,
        errors: z.flattenError(validation.error).fieldErrors,
        success: false,
      };
    }

    const { id, image, ...rest } = validation.data;

    const currentProduct = await getProduct(id);
    const currentImagePublicId = currentProduct?.imagePublicId;

    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    if (image instanceof File && image.size > 0) {
      const uploaded = await uploadImage(image);
      imageUrl = uploaded.imageUrl;
      imagePublicId = uploaded.publicId;

      await deleteImage(currentImagePublicId);
    }
    const rawPrice = validation.data.price;

    const priceInCents = Math.round(parseFloat(rawPrice as string) * 100);

    await prisma.product.update({
      where: { id },
      data: {
        ...rest,
        price: priceInCents,
        ...(imageUrl ? { image: imageUrl, imagePublicId } : {}),
      },
    });

    revalidatePath('/', 'layout');

    return {
      values: validation.data,
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error('e', error);

    return {
      values: state.values,
      errors:
        error instanceof ZodError ? z.flattenError(error).fieldErrors : {},
      success: false,
    };
  }
}

export async function updateProduct(id: string, data: UpdateProductInput) {
  const currentProduct = await getProduct(id);
  const currentImagePublicId = currentProduct?.imagePublicId;

  try {
    const { image, ...rest } = data;

    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    if (image instanceof File) {
      const uploaded = await uploadImage(image);
      imageUrl = uploaded.imageUrl;
      imagePublicId = uploaded.publicId;

      await deleteImage(currentImagePublicId);
    }

    const priceInCents = Math.round(parseFloat(rest.price) * 100);

    await prisma.product.update({
      where: { id },
      data: {
        ...rest,
        price: priceInCents,
        ...(imageUrl ? { image: imageUrl, imagePublicId } : {}),
      },
    });

    revalidatePath('/', 'layout');

    return {
      status: Status.SUCCESS,
      message: 'Product updated successfully',
    };
  } catch (error) {
    return {
      status: Status.ERROR,
      message: 'Product could not be updated',
    };
  }
}

export async function toggleFavourite(id: string, data: Product) {
  try {
    const { isLiked, ...rest } = data;
    await prisma.product.update({
      where: { id },
      data: {
        ...rest,
        isLiked: !isLiked,
      },
    });

    revalidatePath('/', 'layout');

    return {
      status: Status.SUCCESS,
      message: 'Product added to favourites',
    };
  } catch (err) {
    return {
      status: Status.ERROR,
      message: 'Product could not be added to favourites',
    };
  }
}
