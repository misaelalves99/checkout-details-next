// app/components/CartTotal.tsx

'use client';

import { useCart } from '../context/CartContext';
import styles from './CartTotal.module.css';

const CartTotal: React.FC = () => {
  const { cartTotal } = useCart(); // Obtendo o total diretamente do CartContext

  return (
    <div className={styles.cartTotalContainer}>
      <h3 className={styles.totalText}>Total: R$ {cartTotal.toFixed(2)}</h3>
    </div>
  );
};

export default CartTotal;
