const mercadopago = require("mercadopago");
const db = require("../config/dbConfig");
const TurnoModel = db.turno;

exports.createPreference = async (req, res) => {
  //Generar entrada  de mongo

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
      const entrada = new TurnoModel({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        celular: req.body.celular,
        email: req.body.email,
        asunto: req.body.asunto,
        modalidad: req.body.modalidad,
        metodoDePago: req.body.mdp,
        fuePagado: false,
        fecha: req.body.fecha,
        mensaje: req.body.mensaje,
        paymentId: response.body.id,
      });

      entrada.save(entrada).catch((err) =>
        res.status(500).send({
          status: "KO",
          errDesc: err.message || "Error creando nuevo turno",
        })
      );
    })
    .catch(function (error) {
      console.log(error);
    });
};

exports.feedback = async (req, res) => {
  //actualizo entrada de mongo
  res.send({ berno: req.params });
};
