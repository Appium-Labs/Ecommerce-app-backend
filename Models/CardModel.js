const { Schema, model } = require("mongoose");

const CardSchema = Schema({
  company: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  expiry_date: {
    type: String,
    required: true,
  },
});

module.exports = Card = model("card", CardSchema);
