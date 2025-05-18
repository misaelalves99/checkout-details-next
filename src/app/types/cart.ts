// app/types/cart.ts

import { Product } from "./product";

export interface CartItem {
  id: string | number;  // Identificador do item no carrinho
  productId: string | number;  // Identificador do produto
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  product: Product;  // Dados completos do produto
  category?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: { productId: number } }
  | { type: "CLEAR_CART" };

// 01-Estruturas e Tratamento -
// 03-Arrays -
// 04-Objetos -