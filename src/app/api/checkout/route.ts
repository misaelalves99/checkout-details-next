// app/api/checkout/route.ts

import { NextRequest, NextResponse } from "next/server";

// Tipagem opcional do corpo da requisição
type Review = {
  productId: string;
  username: string;
  rating: number;
  comment: string;
  date?: string; // Opcional, pode ser gerado no backend
};

type CheckoutBody = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
  reviews?: Review[]; // <-- Avaliações enviadas com o pedido
};

// Simula o processamento de checkout
export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();

    // Simulação: você pode adicionar validações ou salvar em DB aqui
    console.log("📦 Pedido recebido:", {
      cliente: body.fullName,
      endereço: `${body.address}, ${body.city} - ${body.postalCode}`,
      pagamento: body.paymentMethod,
    });

    // Se houver avaliações, exibe no console
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

    // Resposta simulada de sucesso
    return NextResponse.json(
      { message: "✅ Pedido e avaliações processados com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Erro no checkout:", error);
    return NextResponse.json(
      { message: "❌ Falha ao processar o pedido." },
      { status: 500 }
    );
  }
}
