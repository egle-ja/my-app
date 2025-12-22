'use client';

import { ProductWrapper } from '@/types/global';
import { useState } from 'react';
import ProductItem from '@/components/products/product-item';
import EditProductForm from '@/components/products/edit-product-form';

export default function Product({ product }: ProductWrapper) {
  const [isEditing, setIsEditing] = useState(false);
  const [displayImage, setDisplayImage] = useState<string | null>(
    product.image ?? null,
  );

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  return (
    <>
      <ProductItem product={product} displayImage={displayImage} />
      <button className="button buttonStandalone" onClick={handleEdit}>
        Edit
      </button>
      {isEditing && (
        <EditProductForm
          product={product}
          setIsEditing={setIsEditing}
          setDisplayImage={setDisplayImage}
          handleCancel={handleCancel}
        />
      )}
    </>
  );
}
