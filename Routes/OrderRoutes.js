const express = require("express");
const orderController = require("../Controllers/OrderController");

const router = express.Router();
router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router.route("/:id").get(orderController.getOrderById);

module.exports = router;
