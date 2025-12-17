'use client';
import { Controller, useFormContext } from 'react-hook-form';
import styles from '../products/products.module.css';

interface SelectInputProps {
  name: string;
  options: string[];
}

export default function SelectInput({ name, options }: SelectInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field, fieldState }) => (
        <div className={styles.inputWrapper}>
          <select {...field}>
            <option value="">Select {name.toLowerCase()}...</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {fieldState.error && (
            <p className={styles.error}>{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
