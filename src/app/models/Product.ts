// app/models/Product.ts

export class Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;

  constructor(id: string, name: string, price: number, category: string, description: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
  }

  getFormattedPrice(): string {
    return `$${this.price.toFixed(2)}`;
  }
}

// 02-Funções e Métodos -
// 04-Objetos -
