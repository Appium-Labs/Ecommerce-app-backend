const Card = require("../Models/CardModel");

exports.createCard = async (req, res, next) => {
  try {
    const newCard = await Card.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        car: newCard,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot create car error: ${err}`,
    });
  }
};

exports.getAllCards = async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.status(201).json({
      status: "Success",
      data: {
        cards: cards,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot get all cards error: ${err}`,
    });
  }
};

exports.getCardById = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    res.status(201).json({
      status: "Success",
      data: {
        card: card,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: `cannot get card error: ${err}`,
    });
  }
};
