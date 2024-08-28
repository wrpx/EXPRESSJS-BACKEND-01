import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../Models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from '../env';

const userRepository = AppDataSource.getRepository(User);

const sendResponse = (res: Response, status: number, data: any): void => {
  res.status(status).json(data);
};

const handleError = (res: Response, error: unknown): void => {
  console.error(error);
  sendResponse(res, 500, { message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
};

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const existingUser = await userRepository.findOne({ where: { username } });

    if (existingUser) {
      sendResponse(res, 400, { message: "ชื่อผู้ใช้นี้มีอยู่แล้ว" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = userRepository.create({
      username,
      password: hashedPassword,
    });

    await userRepository.save(newUser);
    sendResponse(res, 201, { message: "ลงทะเบียนสำเร็จ" });
  } catch (error) {
    handleError(res, error);
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await userRepository.findOne({ where: { username } });

    if (!user) {
      sendResponse(res, 400, { message: "ไม่พบชื่อผู้ใช้นี้" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      sendResponse(res, 400, { message: "รหัสผ่านไม่ถูกต้อง" });
      return;
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        sendResponse(res, 200, { token });
      }
    );
  } catch (error) {
    handleError(res, error);
  }
};

const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      sendResponse(res, 404, { message: "ไม่พบผู้ใช้" });
      return;
    }

    const { id, username, createdAt, updatedAt } = user;
    sendResponse(res, 200, { id, username, createdAt, updatedAt });
  } catch (error) {
    handleError(res, error);
  }
};

export { register, login, getProfile };