export const applyCreditCardMask = (value: string): string => {
  return value
    .replace(/\D/g, "") 
    .substring(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

// 02-Funções e Métodos -
