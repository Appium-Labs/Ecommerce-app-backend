const { Schema, model } = require("mongoose");

const OrderSchema = Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },

  date_of_purchase: {
    type: String,
    required: true,
  },
});

module.exports = Order = model("order", OrderSchema);
