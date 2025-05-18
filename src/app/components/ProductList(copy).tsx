// app/components/ProductList.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";
import styles from "./ProductList.module.css";
import { CartItem } from "../types/cart"; // Importe o tipo CartItem

interface ProductListProps {
  products: Product[];
  selectedCategory?: string;
  filter?: "lowToHigh" | "highToLow" | "";
  searchQuery?: string;
  priceRange?: [number, number];
  overrideProducts?: Product[]; // Permite sobrescrever os produtos carregados
}

const ProductList: React.FC<ProductListProps> = ({
  selectedCategory = "",
  filter = "",
  searchQuery = "",
  priceRange = [0, Infinity],
  overrideProducts = [],
}) => {
  const { products, setProducts } = useProduct();
  const { addToCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleBuyNow = (product: Product) => {
    const cartItem: CartItem = {
      id: String(product.id),
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      product: product, // CartItem INCLUI a propriedade product
      category: product.category, // Adicionando a category, já que CartItem espera
    };
    addToCart(cartItem);
    router.push("/checkout");
  };

  const fetchProducts = async (): Promise<Product[]> => {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      return await res.json();
    } catch (err) {
      setError("Erro ao carregar produtos");
      throw err;
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const base = overrideProducts.length
          ? overrideProducts
          : await fetchProducts();

        const filtered = base.filter((p) =>
          (!selectedCategory || p.category === selectedCategory) &&
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          p.price >= priceRange[0] &&
          p.price <= priceRange[1]
        );

        if (filter === "lowToHigh") filtered.sort((a, b) => a.price - b.price);
        if (filter === "highToLow") filtered.sort((a, b) => b.price - a.price);

        setProducts(filtered);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [filter, selectedCategory, searchQuery, priceRange, overrideProducts]);

  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!products.length) return <p className={styles.noProductsMessage}>Nenhum produto encontrado.</p>;

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onBuyNow={handleBuyNow}  // Passando a função 'handleBuyNow' como prop
        />
      ))}
    </div>
  );
};

export default ProductList;
