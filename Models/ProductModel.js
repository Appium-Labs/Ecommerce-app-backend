const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  company: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  photos: [
    {
      url: {
        type: String,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
});

module.exports = Product = model("product", ProductSchema);
