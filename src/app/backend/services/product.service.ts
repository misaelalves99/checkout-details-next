import prisma from '../config/prisma';
import { Product } from '../models/product';
import { fallbackProducts } from '../utils/fallbackProducts';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProductsFromDb = async (): Promise<Product[]> => {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return fallbackProducts;
  }
};

export const getProductByIdFromDb = async (id: number): Promise<Product | null> => {
  try {
    return await prisma.product.findUnique({ where: { id } });
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
};

export const createProductInDb = async (data: Product): Promise<Product> => {
  try {
    return await prisma.product.create({ data });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw new Error("Erro ao criar produto");
  }
};

export const updateProductInDb = async (id: number, data: Partial<Product>): Promise<Product> => {
  try {
    return await prisma.product.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw new Error("Erro ao atualizar produto");
  }
};

export const deleteProductFromDb = async (id: number): Promise<void> => {
  try {
    await prisma.product.delete({ where: { id } });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    throw new Error("Erro ao excluir produto");
  }
};

// Lista todos os produtos
export const getAllProducts = async (): Promise<Product[]> => {
  return await prisma.product.findMany();
};

// Busca um produto por ID
export const getProductById = async (id: number): Promise<Product | null> => {
  return await prisma.product.findUnique({ where: { id } });
};

// Cria um novo produto
export const createProduct = async (data: Product): Promise<Product> => {
  return await prisma.product.create({ data });
};

// Atualiza um produto existente
export const updateProduct = async (id: number, data: Partial<Product>): Promise<Product> => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const getProduct = (id: number) => prisma.product.findUnique({ where: { id } });

export const deleteProduct = (id: number) =>
  prisma.product.delete({ where: { id } });
