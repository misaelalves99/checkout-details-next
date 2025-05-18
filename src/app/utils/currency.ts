export const convertCurrency = (amount: number, exchangeRate: number): number => {
  return amount * exchangeRate;
};

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

// 02-Funções e Métodos -
// 03-Arrays -
