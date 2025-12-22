'use client';

import { ProductListMode, ProductsWrapper } from '@/types/global';
import SelectInput from '@/components/form/selectInput';
import ProductList from '@/components/products/product-list';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './products.module.css';

type FormValues = {
  productFilter: ProductListMode;
};
export default function Products({ products }: ProductsWrapper) {
  const [mode, setMode] = useState<ProductListMode>(ProductListMode.ALL);

  const methods = useForm<FormValues>({
    defaultValues: { productFilter: ProductListMode.ALL },
  });

  const selectedMode = methods.watch('productFilter');

  useEffect(() => {
    setMode(selectedMode);
  }, [selectedMode]);

  const filteredProducts =
    mode === ProductListMode.ALL
      ? products
      : products.filter((product) => product.isLiked);

  return (
    <>
      <div className={styles.productFilter}>
        <FormProvider {...methods}>
          <form>
            <SelectInput
              name="productFilter"
              options={Object.values(ProductListMode)}
            />
          </form>
        </FormProvider>
      </div>

      <ProductList products={filteredProducts} />
    </>
  );
}
