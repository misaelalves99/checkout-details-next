// app/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductList from "./components/ProductList";
import { Product } from "./types/product";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product");
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleNavigate = () => {
    router.push("/products");
  };

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Bem-vindo ao Nosso E-commerce</h1>
        <p className={styles.description}>Explore nossos produtos incríveis!</p>
        <button className={styles.heroButton} onClick={handleNavigate}>
          Ver Produtos
        </button>
      </section>

      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Produtos em Destaque</h2>
        <ProductList overrideProducts={products.slice(0, 6)} />
      </section>
    </main>
  );
};

export default HomePage;

// 01-Estruturas e Tratamento -
// 03-Arrays -
// 05-Formulários e Eventos -
// 06-Hooks -
// 08-Api -
// 09-Renderização Condicional -
