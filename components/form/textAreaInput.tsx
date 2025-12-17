'use client';

import { Controller, useFormContext } from 'react-hook-form';
import styles from '../products/products.module.css';

interface TextareaInputProps {
  name: string;
  placeholder?: string;
  rows?: number;
}

export default function TextAreaInput({
  name,
  placeholder,
  rows = 4,
}: TextareaInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue="" // Important to avoid uncontrolled -> controlled warning
      render={({ field, fieldState }) => (
        <div className={styles.inputWrapper}>
          <textarea
            {...field}
            placeholder={placeholder}
            id={name}
            rows={rows}
          />
          {fieldState.error && (
            <p className={styles.error}>{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
