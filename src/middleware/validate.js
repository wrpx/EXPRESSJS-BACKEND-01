const validateProduct = (req, res, next) => {
  let { name, detail, price } = req.body;

  if (isNaN(price) || price === undefined || price === null) {
    return res.status(404).json({ error: "Price must be a valid number" });
  }

  const englishTextRegex = /^[A-Za-z0-9 .,!?()-]*$/;
  if (!englishTextRegex.test(name)) {
    return res
      .status(404)
      .json({ error: "Name must be in English characters only." });
  }
  if (!englishTextRegex.test(detail)) {
    return res
      .status(404)
      .json({ error: "Detail must be in English characters only." });
  }

  req.body.price = price;

  next();
};

module.exports = validateProduct;
