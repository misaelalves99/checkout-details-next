// app/checkout/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { CheckoutData } from '../types/checkout';
import styles from './CheckoutPage.module.css';
import Image from 'next/image';

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  deliveryTime: string;
}

const mockShippingOptions: ShippingOption[] = [
  { id: 'normal', name: 'Normal', price: 0, deliveryTime: '15 de maio, quinta' },
  { id: 'rapido', name: 'Retirar Rápido', price: 0, deliveryTime: 'Retirar em 2h' },
];

const mockAddress = {
  isPrincipal: true,
  name: 'Misael Alves dos Santos',
  street: 'Rua Francisco De Souza Campos, 131 - casa',
  cityState: 'Rio Pretinho, Teófilo Otoni - MG',
  cep: '39808-000',
};

const CheckoutPage = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(mockShippingOptions[0]);
  const productId = params.productId;

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Smartphone XYZ',
      price: 1499.90,
      description: 'Smartphone com tela OLED, 6GB de RAM e 128GB de armazenamento.',
      imageUrl: 'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
      category: 'electronics',
      oldPrice: 1699.90,
    },
    {
      id: 2,
      name: 'Camiseta Estilosa',
      price: 59.90,
      description: 'Camiseta 100% algodão, disponível em várias cores.',
      imageUrl: 'https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg',
      category: 'clothing',
      oldPrice: 69.90,
    },
    {
      id: 3,
      name: 'Fone de Ouvido Bluetooth',
      price: 299.90,
      description: 'Fone de ouvido sem fio com excelente qualidade de som.',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
      category: 'electronics',
      oldPrice: 399.90,
    },
    {
      id: 4,
      name: 'Relógio de Pulso',
      price: 249.90,
      description: 'Relógio masculino com design moderno e resistente à água.',
      imageUrl: 'https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg',
      category: 'accessories',
      oldPrice: 269.90,
    },
    {
      id: 5,
      name: 'Jaqueta Casual',
      price: 399.90,
      description: 'Jaqueta estilosa para dias frios.',
      imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg',
      category: 'clothing',
      oldPrice: 499.90,
    },
  ];

  useEffect(() => {
    if (!productId) return;

    const selected = mockProducts.find((p) => p.id === Number(productId));
    if (selected) setProduct(selected);
  }, [productId]);

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleShippingSelect = (option: ShippingOption) => {
    setSelectedShipping(option);
  };

  const calculateTotal = () => {
    if (!product) return 0;
    return product.price * quantity + selectedShipping.price;
  };

  const handleGoToPayment = () => {
    if (!checkoutData) {
      alert('Por favor, preencha seus dados de entrega.');
      return;
    }
    alert('Ir para a página de pagamento (funcionalidade não implementada).');
    console.log('Dados do checkout:', checkoutData);
    console.log('Produto:', product);
    console.log('Quantidade:', quantity);
    console.log('Opção de frete:', selectedShipping);
  };

  const handleCheckoutSubmit = (data: CheckoutData) => {
    setCheckoutData(data);
    alert('✅ Dados de entrega recebidos.');
  };

  // Previne aviso de função não usada (ex: futura integração do formulário)
  console.log(typeof handleCheckoutSubmit); // eslint-disable-line no-console

  if (!product) {
    return <div className={styles.notFound}>Produto não encontrado.</div>;
  }

  const total = calculateTotal();
  const pixDiscount = total * 0.05;
  const totalPix = total - pixDiscount;

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutPanel}>
        <section className={styles.deliveryAddress}>
          <h2>Endereço de entrega</h2>
          <div className={styles.addressCard}>
            {mockAddress.isPrincipal && <span className={styles.principalAddress}>Endereço principal</span>}
            <p>{mockAddress.name}</p>
            <p>{mockAddress.street}</p>
            <p>{mockAddress.cityState}</p>
            <p>CEP: {mockAddress.cep}</p>
            <button className={styles.changeAddressButton}>Novo endereço</button>
            <button className={styles.changeAddressButton}>Escolher outro endereço</button>
          </div>
        </section>

        <section className={styles.shippingOptions}>
          <h2>Escolha a entrega</h2>
          {mockShippingOptions.map((option) => (
            <div
              key={option.id}
              className={`${styles.shippingOption} ${selectedShipping.id === option.id ? styles.selected : ''}`}
              onClick={() => handleShippingSelect(option)}
            >
              <input
                type="radio"
                id={option.id}
                name="shipping"
                value={option.id}
                checked={selectedShipping.id === option.id}
                onChange={() => handleShippingSelect(option)}
              />
              <label htmlFor={option.id}>
                <span className={styles.shippingName}>{option.name}</span>
                <span className={styles.deliveryTime}>{option.deliveryTime}</span>
                <span className={styles.shippingPrice}>
                  {option.price > 0 ? `R$ ${option.price.toFixed(2)}` : 'Grátis'}
                </span>
              </label>
            </div>
          ))}
        </section>

        <section className={styles.checkoutFormSection}>
          <h2>Dados para entrega (opcional)</h2>
          {/* Exemplo futuro: <CheckoutForm onSubmit={handleCheckoutSubmit} /> */}
        </section>
      </div>

      <div className={styles.orderSummary}>
        <h2>Resumo do pedido</h2>
        <div className={styles.summaryItem}>
          <div className={styles.productInfo}>
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={80}
                height={80}
                className={styles.summaryImage}
              />
            )}
            <p className={styles.summaryProductName}>{product.name}</p>
          </div>
          <div className={styles.quantityControl}>
            <button onClick={() => handleQuantityChange('decrement')}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange('increment')}>+</button>
          </div>
          <p className={styles.summaryPrice}>R$ {(product.price * quantity).toFixed(2)}</p>
        </div>

        <div className={styles.summarySubtotal}>
          <span>Subtotal ({quantity} Produto{quantity > 1 ? 's' : ''})</span>
          <span>R$ {(product.price * quantity).toFixed(2)}</span>
        </div>
        <div className={styles.summaryShipping}>
          <span>Entrega</span>
          <span>{selectedShipping.price > 0 ? `R$ ${selectedShipping.price.toFixed(2)}` : 'Grátis'}</span>
        </div>
        <div className={styles.summaryTotal}>
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <div className={styles.paymentInfo}>
          <p>ou R$ {totalPix.toFixed(2)} à vista no Pix</p>
        </div>

        <button className={styles.goToPaymentButton} onClick={handleGoToPayment}>
          Ir para pagamento
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
