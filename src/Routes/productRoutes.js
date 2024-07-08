const express = require("express");
const Router = express.Router();
const {
  list,
  getID,
  post,
  put,
  deleteProduct,
} = require("../Controller/productController");
const { login, register } = require("../Controller/userController");

const validateProduct = require("../middleware/validate");
const auth = require("../middleware/auth");

Router.get("/product/list", auth, list);
Router.get("/product/:id", auth, getID);
Router.put("/product/:id", auth, validateProduct, put);
Router.post("/product/create", auth, validateProduct, post);
Router.delete("/product/:id/delete", auth, deleteProduct);

Router.post("/register", register);
Router.post("/login", login);

module.exports = Router;
