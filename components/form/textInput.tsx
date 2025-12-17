'use client';
import { Controller, useFormContext } from 'react-hook-form';
import styles from '../products/products.module.css';

interface TextInputProps {
  name: string;
  placeholder?: string;
}

export default function TextInput({ name, placeholder }: TextInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field, fieldState }) => (
        <div className={styles.inputWrapper}>
          <input {...field} placeholder={placeholder} id={name} />
          {fieldState.error && (
            <p className={styles.error}>{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
