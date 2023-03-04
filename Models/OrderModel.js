const { Schema, model } = require("mongoose");

const OrderSchema = Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  data_of_purchase: {
    type: Date,
    required: true,
  },
});

module.exports = Order = model("order", OrderSchema);
