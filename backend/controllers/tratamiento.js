const db = require("../config/dbConfig");
const TratamientoModel = db.tratamiento;

exports.create = (req, res) => {
  const entrada = new TratamientoModel({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    subtitulo: req.body.subtitulo,
    categorias: req.body.categorias,
  });

  entrada
    .save(entrada)
    .then((data) => res.send({ status: "OK", errDesc: "", info: data }))
    .catch((err) =>
      res.status(500).send({
        status: "KO",
        errDesc: err.message || "Error creando nuevo tratamiento",
      })
    );
};

exports.all = (req, res) => {
  TratamientoModel.find()
    .then((data) => res.send({ status: "OK", errDesc: "", info: data }))
    .catch((err) =>
      res.status(500).send({
        status: "KO",
        errDesc: err.message || "Error obteniendo tratamientos",
      })
    );
};

exports.find = (req, res) => {
  TratamientoModel.find({ _id: req.params.id })
    .then((data) => res.send({ status: "OK", errDesc: "", info: data }))
    .catch((err) =>
      res.status(500).send({
        status: "KO",
        errDesc: err.message || "Error obteniendo el tratamiento",
      })
    );
};
