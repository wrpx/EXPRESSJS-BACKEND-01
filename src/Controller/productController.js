//productController.js
const Product = require("../Models/productModel");

const sendResponse = (res, message) => {
  res.send(message);
};

const handleError = (res, error) => {
  console.error(error);
  res.status(500).send("Internal Server Error");
};

const list = async (req, res) => {
  try {
    console.log(req.body);
    const produced = await Product.find({}).exec();
    res.send(produced);
  } catch (error) {
    handleError(res, error);
  }
};

const getID = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findOne({ _id: id }).exec();
    res.send(products);
  } catch (error) {
    handleError(res, error);
  }
};

const put = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    }).exec();
    res.send(update);
  } catch (error) {
    handleError(res, error);
  }
};

const post = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const produced = await Product(req.body).save();
    res.send(produced);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findOneAndDelete({ _id: id }).exec();

    if (!deletedProduct) {
      sendResponse(res, "Product not found");
      return;
    }

    sendResponse(res, "Product deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { list, getID, put, post, deleteProduct };
