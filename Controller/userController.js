///userController.js
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendResponse = (res, message, data = {}, statusCode = 200) => {
  res.status(statusCode).send({ message, ...data });
};

const handleError = (res, error) => {
  console.error(error);
  res.status(500).send({ message: "Internal Server Error" });
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return sendResponse(res, "User Already Exists", {}, 400);
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

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return sendResponse(res, "User Not Found", {}, 400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, "Password Invalid", {}, 400);
    }

    const payload = { user: user.username };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          return handleError(res, err);
        }
        res.json({ token, payload });
    });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = { register, login };
