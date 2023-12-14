// middleware.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); // นำเข้า cors

const configureMiddleware = (app) => {
  app.use(cors()); 
  app.use(express.json());
  app.use(morgan("dev"));
};

module.exports = configureMiddleware;
