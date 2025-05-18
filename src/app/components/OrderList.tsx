'use client';

import React from "react";
import OrderCard from "./OrderCard";
import { Order } from "../types/order";
import styles from "./OrderList.module.css";

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className={styles.empty}>
        Nenhum pedido encontrado.
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;

// 01-Estruturas e Tratamento - Lista de pedidos com validação
// 03-Arrays - Mapeamento dos pedidos para renderizar OrderCard
// 07-Props e Router - Recebimento de pedidos via props
// 09-Renderização Condicional - Verificação se há pedidos