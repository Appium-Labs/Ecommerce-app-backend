const Product = require("../Models/ProductModel");

exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot create product error: ${err}`,
    });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(201).json({
      status: "Success",
      data: {
        products: products,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot get all products error: ${err}`,
    });
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(201).json({
      status: "Success",
      data: {
        product: product,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot get product error: ${err}`,
    });
  }
};
