const db = require("../config/dbConfig");
const TratamientoModel = db.tratamiento;
const _ = require("lodash");
const sharp = require("sharp");
const fs = require("fs");

exports.create = async (req, res) => {
  let pathFotos = [];

  if (!req.files) {
    return res.status(500).send({
      status: "KO",
      errDesc: "Error en la subida de imagenes.",
    });
  }
  await Promise.all(
    req.files.map(async (file) => {
      const { buffer, originalname } = file;
      const rndStr = Math.random().toString(36).slice(2);
      const newName = rndStr + originalname.replaceAll(" ", "");

      await sharp(buffer)
        .resize(475, 385)
        .toFormat("png")
        .png({ quality: 50 })
        .toFile("./uploads/" + newName)
        .catch((err) =>
          res
            .status(500)
            .send({ status: "KO", errDesc: "Error subiendo archivou" })
        );

      pathFotos.push("/uploads/" + newName);
    })
  );

  const entrada = new TratamientoModel({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    subtitulo: req.body.subtitulo,
    categorias: req.body.categorias,
    pathFotos,
    esDestacado: req.body.esDestacado,
    dondeEmplear: req.body.dondeEmplear,
  });

  entrada
    .save(entrada)
    .then(async (data) => {
      res.send({ status: "OK", errDesc: "", info: data });
    })
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

exports.delete = (req, res) => {
  TratamientoModel.findByIdAndDelete(
    { _id: req.params.id },
    function (err, data) {
      if (err || !data) {
        res.send({ status: "KO", errDesc: err.message, info: "" });
      } else {
        if (data.pathFotos.length) {
          data.pathFotos.forEach((foto) => {
            fs.unlink("." + foto, (err) => {
              if (err) {
                console.error(err);
                return res
                  .status(500)
                  .send({ status: "KO", info: "", errDesc: err });
              }
              //file removed
            });
          });
        }

        return res.send({ status: "OK", info: data, errDesc: "" });
      }
    }
  );
};

exports.update = async (req, res) => {
  let doc = await TratamientoModel.findOne({ _id: req.params.id });
  let pathFotos =
    typeof req.body.pathFotos === "string"
      ? [req.body.pathFotos]
      : req.body.pathFotos;

  if (!req.files) {
    return res.status(500).send({
      status: "KO",
      errDesc: "Error en la subida de imagenes.",
    });
  }
  await Promise.all(
    req.files.map(async (file) => {
      const { buffer, originalname } = file;
      const rndStr = Math.random().toString(36).slice(2);
      const newName = rndStr + originalname.replaceAll(" ", "");

      await sharp(buffer)
        .resize(475, 385)
        .toFormat("png")
        .png({ quality: 50 })
        .toFile("../uploads/" + newName)
        .catch((err) => {
          console.log(err);
          console.log(`\n ${__dirname}`);
          res
            .status(500)
            .send({ status: "KO", errDesc: "Error subiendo archivou" });
        });

      pathFotos.push("/uploads/" + newName);
    })
  );

  Object.keys(req.body).forEach((key) => (doc[key] = req.body[key]));
  doc.pathFotos = pathFotos;

  doc
    .save()
    .then((savedDoc) => res.send({ status: "OK", info: savedDoc, errDesc: "" }))
    .catch((err) => res.send({ status: "KO", info: {}, errDesc: err }));
};
