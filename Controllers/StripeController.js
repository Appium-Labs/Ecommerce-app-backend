const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.makeMakePayment = async (req, res, next) => {
    try {
        const { ammount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: ammount,
            currency: 'inr',
        });
        // console.log(paymentIntent.client_secret);

        res.status(201).json({
            "client_secret": paymentIntent.client_secret
        })
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: `Cannot create client secret: ${err}`,
        });
    }

}