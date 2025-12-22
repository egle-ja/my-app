'use client';
import { Controller, useFormContext } from 'react-hook-form';
import styles from '../products/products.module.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { capitalize } from '@/lib/utils';

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
      render={({ field, fieldState, formState }) => (
        <div className={styles.inputWrapper}>
          <FormControl fullWidth error={!!fieldState.error?.message}>
            <InputLabel id="select-label">{capitalize(name)}</InputLabel>
            <Select
              {...field}
              id={name}
              label={capitalize(name)}
              labelId="select-label"
            >
              {options.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {fieldState.error?.message ||
                formState.errors?.[name]?.toString()}
            </FormHelperText>
          </FormControl>
        </div>
      )}
    />
  );
}
