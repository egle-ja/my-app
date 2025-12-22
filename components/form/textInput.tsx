'use client';

import { Controller, useFormContext } from 'react-hook-form';
import styles from '../products/products.module.css';
import TextField from '@mui/material/TextField';
import { capitalize } from '@/lib/utils';

interface TextInputProps {
  name: string;
  placeholder?: string;
  rows?: number;
}

export default function TextInput({ name, placeholder, rows }: TextInputProps) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field, fieldState, formState }) => (
        <div className={styles.inputWrapper}>
          <TextField
            {...field}
            placeholder={placeholder}
            id={name}
            label={capitalize(name)}
            error={!!fieldState.error || !!formState.errors[name]}
            fullWidth
            helperText={
              fieldState.error?.message || formState.errors?.[name]?.toString()
            }
            multiline={!!rows}
            rows={rows}
          />
        </div>
      )}
    />
  );
}
