const User = require("../Models/UserModel");
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
      data: {
        token: generateToken(newUser._id),
        user: newUser,
      },
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
    const currentUser = await User.findById(req.params.id);
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
    const user = await User.findOne({ email });
    console.log(user.password);
    if (user && (await comparePassword(password, user.password))) {
      res.status(201).json({
        status: "Success",
        data: {
          token: generateToken(user._id),
          user: user,
        },
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
