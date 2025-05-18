// src/app/components/CheckoutForm.tsx

"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { CheckoutData } from "../types/checkout";
import styles from "./CheckoutForm.module.css";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const { cartItems } = useCart();

  const [formData, setFormData] = useState<CheckoutData>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "creditCard",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do pedido:", formData, cartItems);
    onSubmit(formData);
  };

  const userFields: (keyof CheckoutData)[] = [
    "fullName",
    "email",
    "address",
    "city",
    "postalCode",
  ];

  const creditCardFields: (keyof Pick<
    CheckoutData,
    "cardNumber" | "expirationDate" | "cvv"
  >)[] = ["cardNumber", "expirationDate", "cvv"];

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {userFields.map((field) => (
        <div key={field} className={styles.formGroup}>
          <label htmlFor={field} className={styles.label}>
            {field === "postalCode" ? "CEP" : field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type={field === "email" ? "email" : "text"}
            id={field}
            name={field}
            value={formData[field] || ""}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </div>
      ))}

      <div className={styles.formGroup}>
        <label htmlFor="paymentMethod" className={styles.label}>
          Método de Pagamento
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className={styles.selectField}
        >
          <option value="creditCard">Cartão de Crédito</option>
          <option value="boleto">Boleto Bancário</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      {formData.paymentMethod === "creditCard" && (
        <div className={styles.paymentSection}>
          <h3 className={styles.paymentTitle}>Informações de Cartão</h3>
          {creditCardFields.map((field) => (
            <div key={field} className={styles.paymentGroup}>
              <label htmlFor={field} className={styles.label}>
                {field === "cvv"
                  ? "CVV"
                  : field === "cardNumber"
                  ? "Número do Cartão"
                  : "Data de Expiração"}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
          ))}
        </div>
      )}

      <button type="submit" className={styles.submitButton}>
        Finalizar Compra
      </button>
    </form>
  );
};

export default CheckoutForm;
