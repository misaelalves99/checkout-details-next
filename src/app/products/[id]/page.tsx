// app/products/[id]/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import ProductDetails from '../../components/ProductDetails';
import styles from './ProductPage.module.css';

// Importe o tipo Product corretamente
import { Product } from '../../types/product'; // Adicionado para importar o tipo Product

// O Next.js 14+ usa diretamente o parâmetro da URL no componente
const ProductPage = ({ params }: { params: { id: string } }) => { // Acessa o parâmetro 'id' da rota
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const productId = params.id; // Usa 'params' para acessar o 'id' diretamente

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error('Erro ao carregar o produto');
        const fetchedProduct = await res.json();
        setProduct(fetchedProduct);
      } catch (err) {
        setError('Erro ao carregar o produto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  if (loading) return <div className={styles.loading}>Carregando produto...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) return <div className={styles.error}>Produto não encontrado.</div>;

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: String(product.id),
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      product: product,
    };
    addToCart(cartItem);
  };

  return (
    <div className={styles.container}>
      <ProductDetails product={product} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductPage;
