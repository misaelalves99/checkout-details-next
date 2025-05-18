import React, { useState } from 'react';
import styles from './CurrencyConverter.module.css'; // ✅ Importando o CSS module

interface CurrencyConverterProps {
  amount: number;
  exchangeRate: number;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ amount, exchangeRate }) => {
  const [convertedAmount, setConvertedAmount] = useState(amount * exchangeRate);

  const handleConversion = () => {
    setConvertedAmount(amount * exchangeRate);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Currency Converter</h3>
      <div className={styles.content}>
        <p className={styles.text}>Amount: ${amount.toFixed(2)}</p>
        <p className={styles.text}>Converted: {convertedAmount.toFixed(2)}</p>
        <button
          onClick={handleConversion}
          className={styles.button}
        >
          Convert
        </button>
      </div>
    </div>
  );
};

export default CurrencyConverter;

// 02-Funções e Métodos -
// 06-Hooks -
// 07-Props e Router -
