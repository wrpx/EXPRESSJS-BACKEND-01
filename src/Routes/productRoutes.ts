import express, { Router } from "express";
import {
  list,
  getID,
  post,
  put,
  deleteProduct,
} from "../Controller/productController";
import { login, register } from "../Controller/userController";
import validateProduct from "../middleware/validate";
import auth from "../middleware/auth";

const router: Router = express.Router();

router.get("/product/list", auth, list);
router.get("/product/:id", auth, getID);
router.put("/product/:id", auth, validateProduct, put);
router.post("/product/create", auth, validateProduct, post);
router.delete("/product/:id/delete", auth, deleteProduct);

router.post("/register", register);
router.post("/login", login);

export default router;