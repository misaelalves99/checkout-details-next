// src/types/checkout.ts

export type Review = {
  productId: string;
  username: string;
  rating: number;
  comment: string;
  date?: string;
};

export type CheckoutBody = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
  reviews?: Review[];
};
