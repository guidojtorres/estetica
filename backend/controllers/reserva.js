const db = require("../config/dbConfig");
const ReservaModel = db.reserva;

exports.update = async (req, res) => {
  let doc = await ReservaModel.find({ _id: req.params.id });
  if (!doc) {
    const entrada = new ReservaModel({
      fecha: req.body.fecha,
    });

    entrada
      .save(entrada)
      .then((data) => res.send({ status: "OK", errDesc: "", info: data }))
      .catch((err) =>
        res.status(500).send({
          status: "KO",
          errDesc: err.message || "Error creando nueva reserva",
        })
      );
  } else {
    let reserva = doc;
    Object.keys(req.body).forEach((key) => (reserva[key] = req.body[key]));
    reserva
      .save()
      .then((savedDoc) =>
        res.send({ status: "OK", info: savedDoc, errDesc: "" })
      )
      .catch((err) => res.send({ status: "KO", info: {}, errDesc: err }));
  }
};

exports.all = (req, res) => {
  ReservaModel.find()
    .then((data) => res.send({ status: "OK", errDesc: "", info: data }))
    .catch((err) =>
      res.status(500).send({
        status: "KO",
        errDesc: err.message || "Error obteniendo reservas",
      })
    );
};
