// app/utils/validateExpirationDate.ts

export const validateExpirationDate = (expirationDate: string): boolean => {
  const currentDate = new Date();
  const expDate = new Date(expirationDate);
  
  return expDate > currentDate;
};
