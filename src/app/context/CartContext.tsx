// app/context/CartContext.tsx

'use client';

import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Product } from '../types/product';
import { CartItem } from '../types/cart';

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'INCREMENT_ITEM'; product: Product }
  | { type: 'DECREMENT_ITEM'; productId: string | number }
  | { type: 'REMOVE_ITEM'; productId: string | number }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.productId === action.item.productId);
      const updatedItems = existing
        ? state.items.map(i =>
            i.productId === action.item.productId
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          )
        : [...state.items, action.item];

      const totalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );

      return { items: updatedItems, totalAmount };
    }

    case 'INCREMENT_ITEM': {
      const updatedItems = state.items.map(i =>
        i.productId === action.product.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );

      const totalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );

      return { items: updatedItems, totalAmount };
    }

    case 'DECREMENT_ITEM': {
      const updatedItems = state.items.map(i =>
        i.productId === action.productId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );

      const totalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );

      return { items: updatedItems, totalAmount };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(i => i.productId !== action.productId);
      const totalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );
      return { items: updatedItems, totalAmount };
    }

    case 'CLEAR_CART':
      return { items: [], totalAmount: 0 };

    default:
      return state;
  }
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  incrementFromCart: (product: Product) => void;
  decrementFromCart: (productId: string | number) => void;
  removeFromCart: (productId: string | number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', item });
  };

  const incrementFromCart = (product: Product) => {
    dispatch({ type: 'INCREMENT_ITEM', product });
  };

  const decrementFromCart = (productId: string | number) => {
    dispatch({ type: 'DECREMENT_ITEM', productId });
  };

  const removeFromCart = (productId: string | number) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const cartTotal = state.totalAmount;

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        addToCart,
        incrementFromCart,
        decrementFromCart,
        removeFromCart,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
