const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  shipping_address: {
    type: String,
  },
  profile_photo: {
    type: String,
  },
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  cart_items: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  order_history: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  payment_cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "card" }],
});

module.exports = User = mongoose.model("user", userSchema);
