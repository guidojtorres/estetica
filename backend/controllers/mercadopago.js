const mercadopago = require("mercadopago");
const db = require("../config/dbConfig");
const TurnoModel = db.turno;
const ReservaModel = db.reserva;

exports.crearReservaConPreferencia = async (req, res) => {
  const entrada = new ReservaModel({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    celular: req.body.celular,
    asunto: req.body.asunto,
    modalidad: req.body.modalidad,
    metodoDePago: req.body.mdp,
    fecha: req.body.fecha,
    mensaje: req.body.mensaje,
    fuePagado: false,
    referencia: req.body.referencia,
  });

  entrada
    .save(entrada)
    .then((savedDoc) => res.send({ status: "OK", info: savedDoc, errDesc: "" }))
    .catch((err) => res.send({ status: "KO", info: {}, errDesc: err }));
};

exports.createPreference = async (req, res) => {
  let metadata = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    celular: req.body.celular,
    asunto: req.body.asunto,
    modalidad: req.body.modalidad,
    metodoDePago: req.body.mdp,
    fecha: req.body.fecha,
    mensaje: req.body.mensaje,
    fuePagado: false,
  };

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
    metadata,
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res
        .status(200)
        .send({ id: response.body.id, metadata: response.body.metadata });
    })
    .catch(function (error) {
      console.log(error);
    });
};

exports.feedback = async (req, res) => {
  let doc = await TurnoModel.findOne({ referencia: req.query.preference_id });
  if (req.query.status === "approved") {
    doc.fuePagado = true;
  }

  doc.paymentId = req.query.payment_id;

  doc
    .save()
    .then((data) =>
      res.send({
        status: "OK",
        errDesc: "",
        info: {
          item: data,
          referencia: req.query.preference_id,
          Payment: req.query.payment_id,
          Status: req.query.status,
          MerchantOrder: req.query.merchant_order_id,
        },
      })
    )
    .catch((err) =>
      res.status(500).send({
        status: "KO",
        errDesc: err.message || "Error obteniendo el tratamiento",
      })
    );
};
