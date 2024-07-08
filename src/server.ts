import express, { Express } from "express";
import connectDB from "./config/db";
import configureMiddleware from "./middleware/middleware";
import productRoutes from "./Routes/productRoutes";
import dotenv from 'dotenv';

dotenv.config();

interface EnvironmentVariables {
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
}

const env: EnvironmentVariables = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdb',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret'
};

const app: Express = express();

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    configureMiddleware(app);

    app.use("/api", productRoutes);

    app.listen(env.PORT, () => {
      console.log(`Server Running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();