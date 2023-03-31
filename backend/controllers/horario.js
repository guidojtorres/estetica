const db = require("../config/dbConfig");
const HorarioModel = db.horario;

exports.update = async (req, res) => {
  let doc = await HorarioModel.find();
  if (doc.length < 1) {
    const entrada = new HorarioModel({
      duracion: req.body.duracion,
      turno: req.body.turno,
    });

    entrada
      .save(entrada)
      .then((data) => res.send({ status: "OK", errDesc: "", info: data }))
      .catch((err) =>
        res.status(500).send({
          status: "KO",
          errDesc: err.message || "Error creando nuevos horarios",
        })
      );
  } else {
    let horarios = doc[0];
    Object.keys(req.body).forEach((key) => (horarios[key] = req.body[key]));
    horarios
      .save()
      .then((savedDoc) =>
        res.send({ status: "OK", info: savedDoc, errDesc: "" })
      )
      .catch((err) => res.send({ status: "KO", info: {}, errDesc: err }));
  }
};

exports.all = (req, res) => {
  HorarioModel.find()
    .then((data) => res.send({ status: "OK", errDesc: "", info: data }))
    .catch((err) =>
      res.status(500).send({
        status: "KO",
        errDesc: err.message || "Error obteniendo horarios",
      })
    );
};
