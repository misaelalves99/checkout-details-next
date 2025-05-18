// app/components/CartButton.tsx

'use client';

import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import styles from './CartButton.module.css';

const CartButton = () => {
  const { cartItems } = useCart();

  const itemCount = cartItems.reduce((acc: number, item) => acc + item.quantity, 0);

  return (
    <button className={styles.cartButton}>
      <FaShoppingCart className={styles.icon} />
      {itemCount > 0 && <span className={styles.cartCount}>{itemCount}</span>}
    </button>
  );
};

export default CartButton;
