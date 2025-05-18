// app/utils/numberUtils.ts

export const roundToTwoDecimalPlaces = (num: number): number => {
    return Math.round(num * 100) / 100;
};
  
export const formatAsCurrency = (num: number): string => {
    return num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
};
