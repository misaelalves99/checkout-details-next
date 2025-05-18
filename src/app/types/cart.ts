// app/types/cart.ts

import { Product } from "./product";

export interface CartItem {
  id: string | number;
  productId: string | number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  product: Product;
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
