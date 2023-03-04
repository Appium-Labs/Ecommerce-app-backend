const Order = require("../Models/OrderModel");

exports.createOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        order: newOrder,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot create order error: ${err}`,
    });
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(201).json({
      status: "Success",
      data: {
        orders: orders,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot get all orders error: ${err}`,
    });
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(201).json({
      status: "Success",
      data: {
        order: order,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot get order error: ${err}`,
    });
  }
};
