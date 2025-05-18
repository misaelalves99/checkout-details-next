// app/context/ProductContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, } from "react";

import { Product } from "../types/product";
import { getProducts } from "../lib/api/products"; // ✅ Nova importação do client-side

// Tipagem do contexto para os produtos
type ProductContextType = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>; // uso de Dispatch para maior flexibilidade
  fetchProducts: () => void; // função auxiliar para buscar produtos da API
};

// Criação do contexto com valor inicial undefined
export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

// Tipagem das props para o Provider
type ProductProviderProps = {
  children: ReactNode;
};

// Provider que armazena os produtos no estado global
export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Função que consome a API e atualiza os produtos
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

// Hook customizado para acessar o contexto
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct deve ser usado dentro de um ProductProvider");
  }
  return context;
};

// 01-Estruturas e Tratamento -
// 06-Hooks -