// app/components/ProductList.tsx

'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";
import styles from "./ProductList.module.css";
import { CartItem } from "../types/cart";

interface ProductListProps {
  overrideProducts?: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ overrideProducts = [] }) => {
  const { setProducts, products } = useProduct();
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (overrideProducts.length > 0) {
      setProducts(overrideProducts);
    }
  }, [overrideProducts]);

  const handleBuyNow = (product: Product) => {
    const cartItem: CartItem = {
      id: String(product.id),
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      product,
      category: product.category,
    };
    addToCart(cartItem);
    router.push(`/products/${product.id}`);
  };

  if (!products.length) {
    return <p className={styles.noProductsMessage}>Nenhum produto encontrado.</p>;
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onBuyNow={handleBuyNow} />
      ))}
    </div>
  );
};

export default ProductList;
