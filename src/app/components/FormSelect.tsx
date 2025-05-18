'use client';

import React from 'react';
import styles from './FormSelect.module.css';

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, value, onChange, options }) => {
  return (
    <div className={styles.selectContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <select
        id={name}
        className={styles.select}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;

// 03-Arrays - 
// 05-Formulários e Eventos -
// 07-Props e Router -
