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
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { setProducts, products: contextProducts } = useProduct();
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (products.length > 0) {
      setProducts(products);
    }
  }, [products, setProducts]);

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

  if (!contextProducts.length) {
    return <p className={styles.noProductsMessage}>Nenhum produto encontrado.</p>;
  }

  return (
    <div className={styles.productGrid}>
      {contextProducts.map((product) => (
        <ProductCard key={product.id} product={product} onBuyNow={handleBuyNow} />
      ))}
    </div>
  );
};

export default ProductList;
