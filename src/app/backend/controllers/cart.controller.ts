import { Request, Response } from 'express';
import * as cartService from '../services/cart.service';

export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = await cartService.getCart();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart', error: err });
  }
};

export const addItem = async (req: Request, res: Response) => {
  try {
    const updatedCart = await cartService.addToCart(req.body);
    res.status(201).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add item to cart', error: err });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const updatedCart = await cartService.updateCartItem(req.body);
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update cart item', error: err });
  }
};

export const removeItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedCart = await cartService.removeFromCart(Number(id));
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove item', error: err });
  }
};

export const clearCartItems = async (req: Request, res: Response) => {
  try {
    await cartService.clearCart();
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear cart', error: err });
  }
};
