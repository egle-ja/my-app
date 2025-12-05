'use server';

import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {Product} from "@/prisma/generated/client";

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany();
}

export async function addProduct(formData: FormData){
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;

  await prisma.product.create({
    data: {
      title,
      category,
      description,
    },
  });

  revalidatePath('/');
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.product.delete({
    where: { id },
  });

  revalidatePath('/');
}
