// app/checkout/[productId]/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import CheckoutForm from '../../components/CheckoutForm';
import CheckoutActions from '../../components/CheckoutActions';
import CheckoutSummary from '../../components/CheckoutSummary';
import { Product } from '../../types/product';
import { Review } from '../../utils/Review';
import { CheckoutData } from '../../types/checkout';
import { ReviewData } from '../../types/review';
import styles from './CheckoutPage.module.css';

const CheckoutPage = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const productId = params.productId;

  // Dados mockados diretamente no frontend
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    price: 1499.99,
    description: 'Smartphone com tela OLED, 6GB de RAM e 128GB de armazenamento.',
    imageUrl: 'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
    category: 'electronics',
  },
  {
    id: 2,
    name: 'Camiseta Estilosa',
    price: 59.9,
    description: 'Camiseta 100% algodão, disponível em várias cores.',
    imageUrl: 'https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg',
    category: 'clothing',
  },
  {
    id: 3,
    name: 'Fone de Ouvido Bluetooth',
    price: 299.9,
    description: 'Fone de ouvido sem fio com excelente qualidade de som.',
    imageUrl: 'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
    category: 'electronics',
  },
  {
    id: 4,
    name: 'Relógio de Pulso',
    price: 249.9,
    description: 'Relógio masculino com design moderno e resistente à água.',
    imageUrl: 'https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg',
    category: 'accessories',
  },
  {
    id: 5,
    name: 'Jaqueta Casual',
    price: 399.9,
    description: 'Jaqueta estilosa para dias frios.',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg',
    category: 'clothing',
  },
];

  useEffect(() => {
    if (!productId) return;

    // Busca o produto no array mockado
    const selected = mockProducts.find((p) => p.id === Number(productId));
    if (selected) setProduct(selected);

    // Busca avaliações salvas no localStorage
    const savedReviews = localStorage.getItem(`reviews-${productId}`);
    if (savedReviews) {
      const parsed: ReviewData[] = JSON.parse(savedReviews);
      const formatted = parsed.map(
        (r) =>
          new Review(r.productId, r.username, r.rating, r.comment, new Date(r.date))
      );
      setReviews(formatted);
    }
  }, [productId]);

  const handleCheckoutSubmit = (data: CheckoutData) => {
    setCheckoutData(data);
    alert('✅ Dados do formulário recebidos. Agora clique em "Finalizar Pedido".');
  };

  const handleFinishOrder = async () => {
    if (!checkoutData || !product) {
      alert('Preencha o formulário de checkout antes de finalizar o pedido.');
      return;
    }

    const payload = {
      ...checkoutData,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
      },
      reviews: reviews.map((r) => ({
        productId: r.productId,
        username: r.username,
        rating: r.rating,
        comment: r.comment,
        date: r.date.toISOString(),
      })),
    };

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      alert(result.message || '✅ Pedido enviado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao enviar pedido:', error);
      alert('❌ Erro ao processar o pedido.');
    }
  };

  if (!product) {
    return <div className={styles.notFound}>Produto não encontrado.</div>;
  }

  return (
    <div className={styles.container}>
      <section className={styles.checkoutSection}>
        <h1 className={styles.checkoutTitle}>Finalizar Compra</h1>

        <div className={styles.productCard}>
          <img
            src={product.imageUrl || '/placeholder.png'}
            alt={product.name}
            className={styles.productImage}
          />
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.productPrice}>R$ {product.price.toFixed(2)}</p>
        </div>

        <CheckoutForm onSubmit={handleCheckoutSubmit} />

        <div className={styles.checkoutBottom}>
          <CheckoutSummary />
          <CheckoutActions onFinish={handleFinishOrder} />
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
