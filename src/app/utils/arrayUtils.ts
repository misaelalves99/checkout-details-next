// 03-Arrays - Funções utilitárias para manipulação de arrays

// Clona um array
export const cloneArray = <T>(arr: T[]): T[] => {
  return [...arr];
};

// Verifica se é um array (sem usar `any`)
export const isArray = <T = unknown>(value: unknown): value is T[] => {
  return Array.isArray(value);
};

// Aplica map em um array
export const mapArray = <T, U>(arr: T[], fn: (item: T) => U): U[] => {
  return arr.map(fn);
};

// Aplica filter em um array
export const filterArray = <T>(arr: T[], fn: (item: T) => boolean): T[] => {
  return arr.filter(fn);
};

// Aplica reduce em um array
export const reduceArray = <T, U>(
  arr: T[],
  fn: (acc: U, item: T) => U,
  initialValue: U
): U => {
  return arr.reduce(fn, initialValue);
};

// Aplica forEach em um array
export const forEachArray = <T>(arr: T[], fn: (item: T) => void): void => {
  arr.forEach(fn);
};

// Encontra item em um array
export const findInArray = <T>(arr: T[], fn: (item: T) => boolean): T | undefined => {
  return arr.find(fn);
};



// 04-Objetos - Funções utilitárias para manipulação de objetos

// Lista as chaves de um objeto
export const getObjectKeys = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[];
};

// Lista os valores de um objeto
export const getObjectValues = <T extends object>(obj: T): T[keyof T][] => {
  return Object.values(obj) as T[keyof T][];
};

// Lista as entradas [chave, valor] de um objeto
export const getObjectEntries = <T extends object>(obj: T): [keyof T, T[keyof T]][] => {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
};

// Cria uma cópia rasa de um objeto
export const shallowCopy = <T extends object>(obj: T): T => {
  return { ...obj };
};

// Congela um objeto para evitar alterações
export const freezeObject = <T extends object>(obj: T): Readonly<T> => {
  return Object.freeze(obj);
};

// Verifica se o objeto está congelado
export const isObjectFrozen = (obj: object): boolean => {
  return Object.isFrozen(obj);
};

// Combina múltiplos objetos em um novo
export const mergeObjects = <T extends object>(...objects: T[]): T => {
  return Object.assign({}, ...objects);
};
