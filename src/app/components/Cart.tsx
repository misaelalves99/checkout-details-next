// app/components/Cart.tsx

'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import styles from './Cart.module.css';
import CurrencyConverter from './CurrencyConverter';
import CartItem from './CartItem';
import CartTotal from './CartTotal';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const exchangeRate = 0.20;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Seu Carrinho</h1>

      {cartItems.length === 0 ? (
        <p className={styles.emptyMessage}>O seu carrinho está vazio.</p>
      ) : (
        <>
          <div className={styles.productGrid}>
            {cartItems.map((item) => (
              <CartItem
                key={item.product.id}
                item={{
                  id: item.product.id,
                  name: item.product.name,
                  price: item.product.price,
                  quantity: item.quantity,
                  imageUrl: item.product.imageUrl || '',
                  category: item.product.category || '',
                }}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>

          <div className={styles.summary}>
            <CartTotal />
            <button className={styles.clearButton} onClick={handleClearCart}>
              Limpar Carrinho
            </button>
            <div className={styles.converterWrapper}>
              <CurrencyConverter amount={totalAmount} exchangeRate={exchangeRate} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
