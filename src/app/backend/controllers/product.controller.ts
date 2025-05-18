import { Request, Response } from 'express';
import * as productService from "../services/product.service";
import { getAllMockProducts, getProductById } from "../utils/mockProducts";
import { getProductsFromDb, getProductByIdFromDb, createProductInDb, updateProductInDb, deleteProductFromDb, } from '../services/product.service';

// GET /products - Lista todos os produtos
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    const fallback = await getAllMockProducts();
    res.status(200).json(fallback);
  }
};

// GET /products/:id - Busca um produto pelo ID
export const getProductById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "ID do produto é necessário" });
  }

  try {
    const product = await productService.getProductById(id);
    if (!product) {
      const mock = await getMockProductById(id);
      return mock
        ? res.status(200).json(mock)
        : res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ message: "Erro ao buscar produto" });
  }
};

// GET /products
export const getProducts = async (_: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    const fallback = await getAllMockProducts();
    res.status(200).json(fallback);
  }
};

// GET /products/:id
export const getProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "ID do produto é necessário" });
  }

  try {
    const product = await productService.getProduct(id);
    if (!product) {
      const mock = await getProductById(id);
      return mock
        ? res.status(200).json(mock)
        : res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ message: "Erro ao buscar produto" });
  }
};

// POST /products - Cria um novo produto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro ao criar produto" });
  }
};

// PUT /products/:id - Atualiza um produto existente
export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const updatedProduct = await productService.updateProduct(id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro ao atualizar produto" });
  }
};

// DELETE /products/:id - Remove um produto
export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await productService.deleteProduct(id);
    res.json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ message: "Erro ao excluir produto" });
  }
};
