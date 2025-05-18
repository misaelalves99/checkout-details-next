// app/hooks/cartReducer.ts

// app/hooks/cartReducer.ts

import { CartItem } from "../types/cart";
import { Product } from "../types/product";

type Action =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; productId: number | string }
  | { type: "CLEAR_CART" };

interface State {
  items: CartItem[];
}

export const cartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) => item.productId === action.product.id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.productId === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      const newItem: CartItem = {
        id: action.product.id,
        productId: action.product.id,
        name: action.product.name,
        price: action.product.price,
        imageUrl: action.product.imageUrl ?? action.product.image ?? '',
        quantity: 1,
        product: action.product,
        category: action.product.category,
      };

      return {
        items: [...state.items, newItem],
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedItems = state.items
        .map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return { items: updatedItems };
    }

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
};
