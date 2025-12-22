'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { useRef, useState } from 'react';
import styles from '../products/products.module.css';
import Image from 'next/image';
import imagePlaceholder from '@/assets/image-placeholder.svg';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

interface FileInputProps {
  name: string;
  defaultImage?: string | null;
}

export default function FileInput({ name, defaultImage }: FileInputProps) {
  const { control } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultImage}
      render={({ field, fieldState, formState }) => (
        <>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`${styles.imageWrapper} ${styles.clickableImageWrapper}`}
          >
            <Image
              src={preview || defaultImage || imagePlaceholder.src}
              alt="Product image"
              fill
              className={styles.image}
            />
          </button>
          <input
            type="file"
            accept="image/*"
            defaultValue={undefined}
            hidden
            name={field.name}
            ref={(el) => {
              field.ref(el);
              fileInputRef.current = el;
            }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              field.onChange(file);
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
          <FormControl
            fullWidth
            error={!!fieldState.error?.message || !!formState.errors[name]}
          >
            <FormHelperText>
              {fieldState?.error?.message ||
                formState.errors?.[name]?.toString()}
            </FormHelperText>
          </FormControl>
        </>
      )}
    />
  );
}
