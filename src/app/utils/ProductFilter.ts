// app/utils/ProductFilter.ts

import { Product } from "../models/Product";

type FilterOptions = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

export class ProductFilter {
  static filter(products: Product[], options: FilterOptions): Product[] {
    return products.filter(product => {
      const matchesCategory = options.category ? product.category === options.category : true;
      const matchesMinPrice = options.minPrice ? product.price >= options.minPrice : true;
      const matchesMaxPrice = options.maxPrice ? product.price <= options.maxPrice : true;
      return matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
  }
}

// 03-Arrays -
// 04-Objetos -
// 09-Renderização Condicional -
