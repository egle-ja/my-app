import prisma from '@/lib/prisma';
import styles from './page.module.css';
import {addProduct, getProducts, deleteProduct} from "@/lib/products";
import {Product} from "@/prisma/generated/client";

export default async function Home() {
  const products: Product[] = await getProducts();
  return (
    <main>
    <ul className={styles.products}>
      {products.map((product) => (
          <li className={styles.product} key={product.id}>
            <div className={styles.productDescription}>
            <div>{product.title}</div>
            <div>{product.category}</div>
            <div>{product.price}</div>
            <div>{product.condition}</div>
            <div>{product.description}</div>
            <div>{product.location}</div>
            </div>
            <form action={deleteProduct}>
              <input type="hidden" name="id" value={product.id} />
              <button type="submit">Delete product</button>
            </form>
          </li>
      ))}
    </ul>
      <form action={addProduct}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter your product title"
        />
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter your product category"
        />
        <textarea
          id="description"
          name="description"
          placeholder="Write your description here..."
          rows={6}
        />
        <button type="submit">Add product</button>
      </form>
    </main>
  );
}
