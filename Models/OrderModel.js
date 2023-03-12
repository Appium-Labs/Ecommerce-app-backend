const { Schema, model } = require("mongoose");

const OrderSchema = Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  delivery_status: {
    type: Boolean,
    required: true,
  },
  shipping_address: {
    type: "String",
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  date_of_purchase: {
    type: String,
    required: true,
  },
});

module.exports = Order = model("order", OrderSchema);
