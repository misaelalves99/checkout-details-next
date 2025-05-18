import { Product } from './product'; // Certifique-se de que o caminho está correto

export interface Checkout {
    products: Product[];
    totalPrice: number;
    shippingAddress: string;
    billingAddress: string;
    paymentMethod: 'credit' | 'debit' | 'paypal';
}

export interface CheckoutData {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    paymentMethod: 'creditCard' | 'boleto' | 'paypal';
    cardNumber?: string;
    expirationDate?: string;
    cvv?: string;
}

export type CheckoutForm = {
    name: string;
    address: string;
    paymentMethod: "credit_card" | "boleto" | "pix";
};

export interface CheckoutData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'creditCard' | 'boleto' | 'paypal';
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
}
