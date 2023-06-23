const mercadopago = require("mercadopago");
const db = require("../config/dbConfig");
const TurnoModel = db.turno;
const ReservaModel = db.reserva;
const axios = require("axios");

exports.crearReservaConPreferencia = async (req, res) => {
  let fuePagado = req.body.status === "approved" ? true : false;
  const mpRes = await axios({
    method: "GET",
    url: `https://api.mercadopago.com/checkout/preferences/${req.body.ref_id}`,
    headers: {
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      "Access-Control-Allow-Origin": false,
    },
  }).catch((e) => console.log(e));

  if (!mpRes.data) {
    res.send({
      status: "KO",
      info: {},
      errDesc: `Hubo un error recuperando los datos de tu turno. Numero de referencia: ${req.body.ref_id}`,
    });
    return;
  }

  const metadata = await mpRes.data.metadata;

  const entrada = new TurnoModel({
    nombre: metadata.nombre,
    apellido: metadata.apellido,
    email: metadata.email,
    celular: metadata.celular,
    asunto: metadata.asunto,
    modalidad: metadata.modalidad,
    metodoDePago: 1,
    fecha: metadata.fecha,
    mensaje: metadata.mensaje,
    fuePagado,
    referencia: req.body.ref_id,
    paymentId: req.body.paymentId,
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
      success: "https://www.dravivianagarcia.com.ar/feedback",
      failure: "https://www.dravivianagarcia.com.ar/feedback",
      pending: "https://www.dravivianagarcia.com.ar/feedback",
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
        errDesc: err.message || "Error obteniendo el turno",
      })
    );
};
