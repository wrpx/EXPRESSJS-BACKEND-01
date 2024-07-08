import { Request, Response } from "express";
import Product, { IProduct } from "../Models/productModel";

const sendResponse = (res: Response, message: string): void => {
  res.send(message);
};

const handleError = (res: Response, error: unknown): void => {
  console.error(error);
  res.status(500).send("Internal Server Error");
};

const list = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
    const products = await Product.find({}).exec();
    res.send(products);
  } catch (error) {
    handleError(res, error);
  }
};

const getID = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const product = await Product.findOne({ _id: id }).exec();
    if (product) {
      res.send(product.toObject());
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    handleError(res, error);
  }
};

const put = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true, runValidators: true }
    ).exec();
    
    if (updatedProduct) {
      res.send(updatedProduct.toObject());
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    handleError(res, error);
  }
};

const post = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("req.body", req.body);
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).send(savedProduct.toObject());
  } catch (error) {
    handleError(res, error);
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const deletedProduct = await Product.findOneAndDelete({ _id: id }).exec();

    if (deletedProduct) {
      sendResponse(res, "Product deleted successfully");
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    handleError(res, error);
  }
};

export { list, getID, put, post, deleteProduct };