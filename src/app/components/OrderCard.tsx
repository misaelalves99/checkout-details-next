// app/components/OrderCard.tsx

'use client';

import React from 'react';
import { Order } from '../types/order';
import styles from './OrderCard.module.css'; // ✅ CSS Modules

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Pedido #{order.id}</h3>
      <p className={styles.date}>
        {/* 02-Funções e Métodos - Conversão de data */}
        Data: {new Date(order.date).toLocaleDateString()}
      </p>
      <p className={styles.total}>Total: R$ {order.total.toFixed(2)}</p>
      <div className={styles.itemsContainer}>
        {order.items.map((item, index) => (
          <div key={index} className={styles.itemRow}>
            {/* 03-Arrays - Mapeamento de itens do pedido */}
            <span className={styles.itemName}>
              {item.product.name} x {item.quantity}
            </span>
            <span className={styles.itemPrice}>
              R$ {(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
