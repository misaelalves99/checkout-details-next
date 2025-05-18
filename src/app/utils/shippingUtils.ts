// app/utils/shippingUtils.ts

export const calculateShippingCost = (weight: number, distance: number): number => {
  const rate = 0.05; // Exemplo de taxa por peso e distância
  return weight * distance * rate;
};

export const isEligibleForFreeShipping = (orderTotal: number): boolean => {
  const freeShippingThreshold = 50; // Valor para frete grátis
  return orderTotal >= freeShippingThreshold;
};
