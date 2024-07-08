import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: string;
}

const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).send({ message: "No token, authorization denied" });
      return;
    }

    const payloadToken = authHeader.split(" ")[1];
    if (!payloadToken) {
      res.status(401).send({ message: "No token, authorization denied" });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(payloadToken, secret) as { user: string };
    req.user = decoded.user;

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).send({ message: "Token expired, please login again" });
    } else {
      res.status(500).send({ message: "Server error" });
    }
  }
};

export default auth;