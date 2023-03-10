const express = require("express");
const userController = require("../Controllers/UserController");
const stripeController = require("../Controllers/StripeController");

const router = express.Router();

router.route("/").post(userController.createUser);

router.route("/login").post(userController.authenticateUser);

router
  .route("/profile/:id")
  .get(userController.getCurrentUserProfile)
  .post(userController.updateUserprofile);

router.route("/addtocart").post(userController.addToCart);
router.route("/addtofav").post(userController.addToFav);
router.route("/addcard").post(userController.addCard);
router.route("/addorder").post(userController.addToOrders);
router.route("/removefromcart").post(userController.removeFromCart);
router.route("/removefromfav").post(userController.removefromfav);
router.route("/makepayment").post(stripeController.makeMakePayment)

module.exports = router;
