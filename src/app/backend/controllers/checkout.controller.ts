// src/controllers/checkoutController.ts

import { Request, Response } from "express";
import { CheckoutBody } from "../types/checkout";

export const processCheckout = async (req: Request, res: Response) => {
  try {
    const body: CheckoutBody = req.body;

    console.log("📦 Pedido recebido:", {
      cliente: body.fullName,
      endereço: `${body.address}, ${body.city} - ${body.postalCode}`,
      pagamento: body.paymentMethod,
    });

    if (body.reviews && body.reviews.length > 0) {
      console.log("📝 Avaliações recebidas:");
      body.reviews.forEach((review, index) => {
        console.log(`  ${index + 1}. Produto: ${review.productId}`);
        console.log(`     Usuário: ${review.username}`);
        console.log(`     Nota: ${review.rating}`);
        console.log(`     Comentário: ${review.comment}`);
        console.log(`     Data: ${review.date || new Date().toISOString()}`);
      });
    }

    return res.status(200).json({
      message: "✅ Pedido e avaliações processados com sucesso!",
    });
  } catch (error) {
    console.error("❌ Erro no checkout:", error);
    return res.status(500).json({
      message: "❌ Falha ao processar o pedido.",
    });
  }
};
