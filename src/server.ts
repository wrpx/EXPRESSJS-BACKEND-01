import express, { Express } from "express";
import { connectDB } from "./config/db";
import configureMiddleware from "./middleware/middleware";
import productRoutes from "./Routes/productRoutes";
import env from './env';

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