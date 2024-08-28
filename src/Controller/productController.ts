import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Product } from "../Models/productModel";

const productRepository = AppDataSource.getRepository(Product);

const sendResponse = (res: Response, status: number, data: any): void => {
  res.status(status).json(data);
};

const handleError = (res: Response, error: unknown): void => {
  console.error(error);
  sendResponse(res, 500, { message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
};

const list = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productRepository.find();
    sendResponse(res, 200, products);
  } catch (error) {
    handleError(res, error);
  }
};

const getID = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const product = await productRepository.findOne({ where: { id } });
    if (product) {
      sendResponse(res, 200, product);
    } else {
      sendResponse(res, 404, { message: "ไม่พบสินค้า" });
    }
  } catch (error) {
    handleError(res, error);
  }
};

const put = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const product = await productRepository.findOne({ where: { id } });
    
    if (product) {
      productRepository.merge(product, req.body);
      const updatedProduct = await productRepository.save(product);
      sendResponse(res, 200, updatedProduct);
    } else {
      sendResponse(res, 404, { message: "ไม่พบสินค้า" });
    }
  } catch (error) {
    handleError(res, error);
  }
};

const post = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = productRepository.create(req.body);
    const savedProduct = await productRepository.save(newProduct);
    sendResponse(res, 201, savedProduct);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const product = await productRepository.findOne({ where: { id } });

    if (product) {
      await productRepository.remove(product);
      sendResponse(res, 200, { message: "ลบสินค้าสำเร็จ" });
    } else {
      sendResponse(res, 404, { message: "ไม่พบสินค้า" });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export { list, getID, put, post, deleteProduct };