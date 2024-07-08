const { readdirSync } = require("fs");
const express = require("express");
const connectDB = require("./config/db");
const configureMiddleware = require("./middleware/middleware");
require('dotenv').config();

const app = express();

const startServer = async () => {
  try {
    await connectDB();

    configureMiddleware(app);

    const routesPath = "./Routes";

    readdirSync(routesPath).map((e) =>
      app.use("/api", require(`${routesPath}/${e}`))
    );

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server Running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

startServer();
