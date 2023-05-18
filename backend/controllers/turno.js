const db = require("../config/dbConfig");
const TurnoModel = db.turno;

exports.create = (req, res) => {
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
  });

  entrada
    .save(entrada)
    .then((data) => res.send({ status: "OK", errDesc: "", info: data }))
    .catch((err) =>
      res.status(500).send({
        status: "KO",
        errDesc: err.message
          ? "Error creando nuevo turno: " + err.message
          : "Error creando nuevo turno",
      })
    );
};

exports.find = (req, res) => {
  TurnoModel.find({ _id: req.params.id })
    .then((data) => res.send({ status: "OK", errDesc: "", info: data }))
    .catch((err) =>
      res.status(500).send({
        status: "KO",
        errDesc: err.message
          ? `Error encontrando el turno ${req.params.id}: ` + err.message
          : `Error encontrando el turno ${req.params.id}`,
      })
    );
};

exports.all = (req, res) => {
  TurnoModel.find()
    .then((data) => res.send({ status: "OK", errDesc: "", info: data }))
    .catch((err) =>
      res.status(500).send({
        status: "KO",
        errDesc: err.message
          ? "Error encontrando los turnos: " + err.message
          : "Error encontrando los turnos",
      })
    );
};

exports.update = async (req, res) => {
  let doc = await TurnoModel.findOne({ _id: req.params.id });

  Object.keys(req.body).forEach((key) => (doc[key] = req.body[key]));

  doc
    .save()
    .then((savedDoc) => res.send({ status: "OK", info: savedDoc, errDesc: "" }))
    .catch((err) => res.send({ status: "KO", info: {}, errDesc: err }));
};

exports.delete = (req, res) => {
  TurnoModel.findByIdAndDelete({ _id: req.params.id }, function (err, data) {
    if (err || !data) {
      res.send({
        status: "KO",
        errDesc: err
          ? "Error borrando los turnos: " + err.message
          : "Error borrando los turnos",
        info: "",
      });
    } else {
      res.send({
        status: "OK",
        info: data,
        errDesc: "",
      });
    }
  });
};
