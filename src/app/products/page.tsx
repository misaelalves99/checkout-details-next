// app/products/page.tsx

import { getProducts } from '../lib/api/products';
import ProductList from '../components/ProductList';
import styles from './ProductsPage.module.css';
import { Product } from '../types/product';

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
