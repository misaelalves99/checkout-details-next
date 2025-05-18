// app/utils/filterProducts.ts

import { Product } from '../types/product';

// Função para filtrar produtos por preço
export const filterProductsByPrice = (products: Product[], maxPrice: number): Product[] => {
  return products.filter((product) => product.price <= maxPrice);
};

// Função para filtrar produtos por nome
export const filterProductsByName = (products: Product[], name: string): Product[] => {
  return products.filter((product) =>
    product.name.toLowerCase().includes(name.toLowerCase())
  );
};

// Função para filtrar produtos por categoria
export const filterProductsByCategory = (products: Product[], category: string): Product[] => {
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
};

// 02-Funções e Métodos -
// 03-Arrays -
