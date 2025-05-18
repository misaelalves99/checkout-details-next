// app/utils/formatDate.ts

export const formatDate = (date: string): string => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatToISO = (date: string): string => {
  const newDate = new Date(date);
  return newDate.toISOString();
};
