// app/utils/calculateDaysUntilFreeShipping.ts

export const calculateDaysUntilFreeShipping = (freeShippingDate: string): number => {
  const currentDate = new Date();
  const targetDate = new Date(freeShippingDate);
  
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysRemaining;
};

// 03-Arrays -
