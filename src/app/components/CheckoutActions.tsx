'use client';

import React from 'react';
import styles from './CheckoutActions.module.css';

interface Props {
  onFinish: () => void;
}

const CheckoutActions: React.FC<Props> = ({ onFinish }) => {
  return (
    <div className={styles.actions}>
      <button className={styles.finishButton} onClick={onFinish}>
        Finalizar Pedido
      </button>
    </div>
  );
};

export default CheckoutActions;

// 01-Estruturas e Tratamento -
// 05-Formulários e Eventos -
// 06-Hooks -
// 08-Api -
// 09-Renderização Condicional -
