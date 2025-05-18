import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCart = async () => {
  const cart = await prisma.cart.findFirst({
    include: { items: true },
  });

  return cart;
};

export const addToCart = async (item: { productId: number; quantity: number; price: number }) => {
  let cart = await prisma.cart.findFirst({ include: { items: true } });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        total: 0,
      },
      include: { items: true },
    });
  }

  const existingItem = cart.items.find((i) => i.productId === item.productId);

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + item.quantity,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        cartId: cart.id,
      },
    });
  }

  return updateCartTotal(cart.id);
};

export const updateCartItem = async (item: { id: number; quantity: number; price: number }) => {
  await prisma.cartItem.update({
    where: { id: item.id },
    data: {
      quantity: item.quantity,
      price: item.price,
    },
  });

  const cartItem = await prisma.cartItem.findUnique({ where: { id: item.id } });

  if (cartItem) {
    return updateCartTotal(cartItem.cartId);
  }

  return null;
};

export const removeFromCart = async (itemId: number) => {
  const item = await prisma.cartItem.findUnique({ where: { id: itemId } });

  if (!item) return null;

  await prisma.cartItem.delete({ where: { id: itemId } });

  return updateCartTotal(item.cartId);
};

export const clearCart = async () => {
  const cart = await prisma.cart.findFirst();
  if (!cart) return;

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  await prisma.cart.update({ where: { id: cart.id }, data: { total: 0 } });
};

const updateCartTotal = async (cartId: number) => {
  const items = await prisma.cartItem.findMany({ where: { cartId } });

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const updatedCart = await prisma.cart.update({
    where: { id: cartId },
    data: { total },
    include: { items: true },
  });

  return updatedCart;
};
