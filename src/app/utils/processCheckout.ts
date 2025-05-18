// src/app/utils/processCheckout.ts

export async function processCheckout() {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "João Silva",
      email: "joao@email.com",
      address: "Rua A, 123",
      city: "São Paulo",
      postalCode: "01000-000",
      paymentMethod: "creditCard",
      cardNumber: "4111111111111111",
      expirationDate: "12/25",
      cvv: "123",
    }),
  });

  if (!res.ok) throw new Error("Erro ao processar o pedido");
  return await res.json();
}
