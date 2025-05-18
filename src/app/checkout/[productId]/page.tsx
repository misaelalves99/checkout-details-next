// app/checkout/[productId]/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '../../types/product';
import { getProducts } from '../../lib/api/products';
import styles from './CheckoutPage.module.css';
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
  const [quantity, setQuantity] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(mockShippingOptions[0]);

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const productId = params.productId;

  useEffect(() => {
    async function fetchProduct() {
      const products = await getProducts();
      const found = products.find((p: Product) => p.id === Number(productId));
      if (found) setProduct(found);
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    setQuantity((prev) => type === 'increment' ? prev + 1 : Math.max(1, prev - 1));
  };

  const handleShippingSelect = (option: ShippingOption) => {
    setSelectedShipping(option);
  };

  const calculateTotal = () => {
    if (!product) return 0;
    return product.price * quantity + selectedShipping.price;
  };

  const handleGoToPayment = () => {
    if (!cardName || !cardNumber || !expiry || !cvv) {
      alert('Por favor, preencha todas as informações do cartão.');
      return;
    }

    alert('Pagamento processado com sucesso (simulado).');
    console.log('Produto:', product);
    console.log('Quantidade:', quantity);
    console.log('Opção de frete:', selectedShipping);
    console.log('Pagamento:', { cardName, cardNumber, expiry, cvv });
  };

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

        <section className={styles.paymentSection}>
          <h2>Método de Pagamento</h2>

          <div className={styles.formGroup}>
            <label htmlFor="paymentMethod">Selecione o Método</label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className={styles.selectInput}
            >
              <option value="credit">Cartão de Crédito</option>
              <option value="pix">PIX</option>
              <option value="boleto">Boleto</option>
            </select>
          </div>

          {paymentMethod === 'credit' && (
            <form className={styles.paymentForm}>
              <div className={styles.formGroup}>
                <label htmlFor="cardName">Nome no Cartão</label>
                <input
                  type="text"
                  id="cardName"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Nome completo"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="cardNumber">Número do Cartão</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength={19}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="expiry">Validade</label>
                  <input
                    type="text"
                    id="expiry"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="password"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="***"
                    maxLength={3}
                  />
                </div>
              </div>
            </form>
          )}

          {paymentMethod === 'pix' && (
            <div className={styles.pixInfo}>
              <p>Use o QR Code gerado na próxima etapa para efetuar o pagamento via PIX.</p>
              <p>O pedido será confirmado automaticamente após o pagamento.</p>
            </div>
          )}

          {paymentMethod === 'boleto' && (
            <div className={styles.boletoInfo}>
              <p>O boleto será gerado na próxima etapa e poderá ser pago em bancos ou lotéricas.</p>
              <p>O prazo de compensação pode levar até 3 dias úteis.</p>
            </div>
          )}
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
          Confirmar Pagamento
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
