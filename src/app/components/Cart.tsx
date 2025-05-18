// app/components/Cart.tsx

'use client';

import React from 'react';
import { useCart } from '../context/CartContext'; // Importando o contexto do carrinho
import styles from './Cart.module.css';
import CurrencyConverter from './CurrencyConverter'; // Converte o valor para outra moeda
import CartItem from './CartItem'; // Usando o componente reutilizável para item
import CartTotal from './CartTotal'; // Total do carrinho

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart(); // Acessando o carrinho do contexto

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId); // Remove o item com o ID específico
  };

  const handleClearCart = () => {
    clearCart(); // Limpa todos os itens do carrinho
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const exchangeRate = 0.20; // Taxa de câmbio para conversão (simulação)

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
                  imageUrl: item.product.imageUrl || '', // Corrigido para imageUrl
                  category: item.product.category || '', // Corrigido para category
                }}
                onRemoveItem={handleRemoveItem} // Passa a função de remoção
              />
            ))}
          </div>

          <div className={styles.summary}>
            <CartTotal /> {/* Não é mais necessário passar o totalAmount para CartTotal */}
            <button className={styles.clearButton} onClick={handleClearCart}>
              Limpar Carrinho
            </button>
            <div className={styles.converterWrapper}>
              <CurrencyConverter amount={totalAmount} exchangeRate={exchangeRate} /> {/* Converte o valor */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
