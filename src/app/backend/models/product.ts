import { Review } from './review';
import { CartItem } from './cartItem';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  reviews?: Review[];
  cartItems?: CartItem[];
}
