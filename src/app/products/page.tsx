// app/products/page.tsx

import { getProducts } from '@/app/lib/api/products';
import ProductList from '@/app/components/ProductList';
import styles from './ProductsPage.module.css';
import { Product } from '@/app/types/product';

export default async function ProductsPage() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Produtos</h1>
      <ProductList products={products} />
    </div>
  );
}
