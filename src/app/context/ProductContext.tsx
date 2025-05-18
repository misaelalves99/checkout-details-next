// app/context/ProductContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, } from "react";

import { Product } from "../types/product";
import { getProducts } from "../lib/api/products";

type ProductContextType = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  fetchProducts: () => void;
};

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = () => {
    getProducts()
      .then(setProducts)
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  };

  return (
    <ProductContext.Provider
      value={{ products, setProducts, fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct deve ser usado dentro de um ProductProvider");
  }
  return context;
};
