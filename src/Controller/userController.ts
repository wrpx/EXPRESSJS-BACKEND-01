import { Request, Response } from "express";
import User from "../Models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sendResponse = (res: Response, message: string, data = {}, statusCode = 200): void => {
  res.status(statusCode).send({ message, ...data });
};

const handleError = (res: Response, error: unknown): void => {
  console.error(error);
  res.status(500).send({ message: "Internal Server Error" });
};

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      sendResponse(res, "User Already Exists", {}, 400);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    sendResponse(res, "Register Success");
  } catch (err) {
    handleError(res, err);
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      sendResponse(res, "User Not Found", {}, 400);
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      sendResponse(res, "Password Invalid", {}, 400);
      return;
    }

    const payload = { user: user.username };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    jwt.sign(payload, secret, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        handleError(res, err);
        return;
      }
      res.json({ token, payload });
    });
  } catch (err) {
    handleError(res, err);
  }
};

export { register, login };