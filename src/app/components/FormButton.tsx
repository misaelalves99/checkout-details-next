'use client';

import React from 'react';
import styles from './FormButton.module.css';

interface FormButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
}

const FormButton: React.FC<FormButtonProps> = ({ text, type, onClick }) => {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default FormButton;

// 05-Formulários e Eventos -
// 07-Props e Router -
