import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";

const configureMiddleware = (app: Express): void => {
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));
};

export default configureMiddleware;