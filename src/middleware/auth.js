const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const payloadToken = req.headers.authorization.split(" ")[1];
    if (!payloadToken) {
      return res
        .status(401)
        .send({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(payloadToken, process.env.JWT_SECRET);
    req.user = decoded.user;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .send({ message: "Token expired, please login again" });
    }
    return res.status(500).send({ message: "Server error" });
  }
};

module.exports = auth;
