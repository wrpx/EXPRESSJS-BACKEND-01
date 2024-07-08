import { readdirSync } from "fs";
import express, { Express } from "express";
import connectDB from "./config/db";
import configureMiddleware from "./middleware/middleware";
import productRoutes from "./Routes/productRoutes";
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    configureMiddleware(app);

    app.use("/api", productRoutes);

    const PORT: number = parseInt(process.env.PORT || '5000', 10);
    app.listen(PORT, () => {
      console.log(`Server Running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

startServer();