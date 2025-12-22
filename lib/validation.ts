import { string, z } from 'zod';
import { Category, Condition } from '@/prisma/generated/enums';

export const createProductSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(50, 'Title must be at most 50 characters'),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number'),
  category: z.enum(Category),
  condition: z.enum(Condition),
  description: z
    .string()
    .min(10, 'Description must be at least 10 chars')
    .max(150, 'Description must be at most 150 characters'),
  image: z.instanceof(File, {
    message: 'Image is required',
  }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(50, 'Title must be at most 50 characters'),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number'),
  category: z.enum(Category),
  condition: z.enum(Condition),
  description: z
    .string()
    .min(10, 'Description must be at least 10 chars')
    .max(150, 'Description must be at most 150 characters'),
  image: z
    .union([
      z.instanceof(File), // new upload
      z.string(), // existing image
    ])
    .optional(),
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const updateProductWithIdSchema = updateProductSchema.extend({
  id: z.string(),
});

export type UpdateProductWithIdInput = z.infer<
  typeof updateProductWithIdSchema
>;
