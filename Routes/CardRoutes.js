const express = require("express");
const cardController = require("../Controllers/CardController");

const router = express.Router();
router
  .route("/")
  .get(cardController.getAllCards)
  .post(cardController.createCard);

router.route("/:id").get(cardController.getCardById);

module.exports = router;
