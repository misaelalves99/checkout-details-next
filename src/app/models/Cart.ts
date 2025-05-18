// app/models/Cart.ts

import { Product } from "./Product";

export class CartItem {
  constructor(public product: Product, public quantity: number) {}
}

export class Cart {
  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return this.items;
  }

  setItems(items: CartItem[]) {
    this.items = items;
  }

  addProduct(product: Product, quantity: number = 1) {
    const existingItem = this.items.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new CartItem(product, quantity));
    }
  }

  removeProduct(productId: string) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
