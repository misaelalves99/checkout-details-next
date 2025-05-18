// components/CheckoutSummary.tsx

'use client';

import React from 'react';
import { Product } from '../types/product';
import styles from './CheckoutSummary.module.css';

type Props = {
  product?: Product;
};

const CheckoutSummary: React.FC<Props> = ({ product }) => {
  if (!product) return null;

  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.title}>Resumo do Pedido</h2>
      <p className={styles.item}><strong>Produto:</strong> {product.name}</p>
      <p className={styles.item}><strong>Preço:</strong> R$ {product.price.toFixed(2)}</p>
      <p className={styles.item}><strong>Quantidade:</strong> 1</p>
      <hr className={styles.divider} />
      <p className={styles.total}><strong>Total:</strong> R$ {product.price.toFixed(2)}</p>
    </div>
  );
};

export default CheckoutSummary;
