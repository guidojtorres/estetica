const mercadopago = require("mercadopago");
const db = require("../config/dbConfig");
const TurnoModel = db.turno;

exports.createPreference = async (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "https://estetica-nine.vercel.app/feedback",
      failure: "https://estetica-nine.vercel.app/feedback",
      pending: "https://estetica-nine.vercel.app/feedback",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.status(200).send({ id: response.body.id });
    })
    .catch(function (error) {
      console.log(error);
    });
};

exports.feedback = async (req, res) => {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
};
