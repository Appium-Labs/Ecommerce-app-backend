const User = require("../Models/UserModel");
const Product = require("../Models/ProductModel");
const Card = require("../Models/CardModel");
const Order = require("../Models/OrderModel");
const generateToken = require("../Utils/GenerateToken");
const {
  hashPassword,
  comparePassword,
} = require("../Utils/Password-Hash-Unhash");

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User Email already Exists");
    }
    const hashedPassword = await hashPassword(password);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "Success",
      user_id: newUser._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot create new user error: ${err}`,
    });
  }
};

exports.getCurrentUserProfile = async (req, res, next) => {
  try {
    const currentUser = await User.findOne({ _id: req.params.id })
      .populate("cart_items")
      .populate("favourites")
      .populate("order_history")
      .populate("payment_cards");

    if (currentUser) {
      res.status(201).json({
        user: currentUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: `User not found: ${err}`,
    });
  }
};

exports.updateUserprofile = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
    updatedUser.save();
    res.status(201).json({
      status: "Success",
      data: {
        token: generateToken(updatedUser._id),
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: `User not found: ${err}`,
    });
  }
};

exports.authenticateUser = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user.password);
    if (user && (await comparePassword(password, user.password))) {
      res.status(201).json({
        status: "Success",
        user_id: user._id,
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: `password does not match`,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: `User not found: ${err}`,
    });
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { user_id, product_id } = req.body;

    const product = await Product.findById(product_id);
    // console.log(product);
    const user = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $push: {
          cart_items: product,
        },
      }
    );
    user.save();
    res.status(201).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: `Unable to add to cart: ${err}`,
    });
  }
};

exports.addToFav = async (req, res, next) => {
  try {
    const { user_id, product_id } = req.body;

    const product = await Product.findById(product_id);
    // console.log(product);
    const user = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $push: {
          favourites: product,
        },
      }
    );
    user.save();
    res.status(201).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: `Unable to add to favorites: ${err}`,
    });
  }
};

exports.addCard = async (req, res, next) => {
  try {
    const { user_id, card_id } = req.body;

    const card = await Card.findById(card_id);
    // console.log(product);
    const user = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $push: {
          payment_cards: card,
        },
      }
    );
    user.save();
    res.status(201).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: `Unable to add Card: ${err}`,
    });
  }
};

exports.addToOrders = async (req, res, next) => {
  try {
    const { user_id, order_id } = req.body;

    const order = await Order.findById(order_id);
    // console.log(product);
    const user = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $push: {
          order_history: order,
        },
      }
    );
    user.save();
    res.status(201).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: `Unable to add to orders: ${err}`,
    });
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { user_id, product_id } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: user_id },
      { $pull: { cart_items: product_id } }
    );
    res.status(201).json({
      user,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: `Unable to remove from cart: ${err}`,
    });
  }
};

exports.removefromfav = async (req, res, next) => {
  try {
    const { user_id, product_id } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: user_id },
      { $pull: { favourites: product_id } }
    );
    res.status(201).json({
      user,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: `Unable to remove from cart: ${err}`,
    });
  }
};
