// app/context/CheckoutContext.tsx
"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { CheckoutForm } from "@/app/types/checkout";

type CheckoutContextType = {
  form: CheckoutForm;
  setForm: (form: CheckoutForm) => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    address: "",
    paymentMethod: "credit_card",
  });

  return (
    <CheckoutContext.Provider value={{ form, setForm }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout deve ser usado dentro de um CheckoutProvider");
  }
  return context;
};
