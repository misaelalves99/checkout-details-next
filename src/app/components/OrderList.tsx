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
