import { Request, Response, NextFunction } from "express";

const validateProduct = (req: Request, res: Response, next: NextFunction): void => {
  const { name, detail, price } = req.body;

  if (typeof price !== 'number' || isNaN(price)) {
    res.status(400).json({ error: "Price must be a valid number" });
    return;
  }

  const englishTextRegex = /^[A-Za-z0-9 .,!?()-]*$/;
  if (!englishTextRegex.test(name)) {
    res.status(400).json({ error: "Name must be in English characters only." });
    return;
  }
  if (!englishTextRegex.test(detail)) {
    res.status(400).json({ error: "Detail must be in English characters only." });
    return;
  }

  next();
};

export default validateProduct;