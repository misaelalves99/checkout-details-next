export const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
};

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/\s+/g, " ");
};

// 02-Funções e Métodos -
// 03-Arrays -

