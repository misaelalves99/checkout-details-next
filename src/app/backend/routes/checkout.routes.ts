// src/routes/checkout.routes.ts

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

interface Review {
  productId: number;
  username: string;
  rating: number;
  comment: string;
  date?: string;
}

interface CheckoutBody {
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
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      address,
      city,
      postalCode,
      paymentMethod,
      cardNumber,
      expirationDate,
      cvv,
      reviews = [],
    }: CheckoutBody = req.body;

    // Cria pedido no banco
    const newOrder = await prisma.order.create({
      data: {
        fullName,
        email,
        address,
        city,
        postalCode,
        paymentMethod,
        cardNumber,
        expirationDate,
        cvv,
        reviews: {
          create: reviews.map((review) => ({
            productId: review.productId,
            username: review.username,
            rating: review.rating,
            comment: review.comment,
            date: review.date ? new Date(review.date) : new Date(),
          })),
        },
      },
      include: { reviews: true },
    });

    res.status(201).json({
      message: "✅ Pedido e avaliações salvos com sucesso!",
      order: newOrder,
    });
  } catch (error) {
    console.error("❌ Erro ao processar o pedido:", error);
    res.status(500).json({ message: "Erro ao processar o pedido." });
  }
});

export default router;
