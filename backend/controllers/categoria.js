const db = require("../config/dbConfig");
const CategoriaModel = db.categoria;
const sharp = require("sharp");
const fs = require("fs");

exports.create = (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).send({
        status: "KO",
        errDesc: "Error en la subida de imagenes.",
      });
    }
  } catch (err) {
    if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
  }

  const { buffer, originalname } = req.file;
  const rndStr = Math.random().toString(36).slice(2);
  const newName = rndStr + originalname.replaceAll(" ", "");

  const entrada = new CategoriaModel({
    nombre: req.body.nombre,
    esDestacada: req.body.esDestacada,
    pathIcono: "/uploads/" + newName,
  });

  entrada
    .save(entrada)
    .then(async (data) => {
      await sharp(buffer)
        .resize(190, 190)
        .toFormat("png")
        .png({ quality: 70 })
        .toFile("./uploads/" + newName, (err, info) => {
          if (err) {
            return res
              .status(500)
              .send({ status: "KO", info: "", errDesc: err });
          }
        });
      res.send({ status: "OK", errDesc: "", info: data });
    })
    .catch((err) =>
      res.status(500).send({
        status: "KO",
        errDesc: err.message || "Error creando nueva categoria",
      })
    );
};

exports.all = (req, res) => {
  CategoriaModel.find()
    .then((data) => res.send({ status: "OK", errDesc: "", info: data }))
    .catch((err) =>
      res.status(500).send({
        status: "KO",
        errDesc: err.message || "Error obteniendo categorias",
      })
    );
};

exports.find = (req, res) => {
  CategoriaModel.find({ _id: req.params.id })
    .then((data) => res.send({ status: "OK", errDesc: "", info: data }))
    .catch((err) =>
      res.status(500).send({
        status: "KO",
        errDesc: err.message || "Error obteniendo una categoria",
      })
    );
};

exports.delete = (req, res) => {
  CategoriaModel.findByIdAndDelete(
    { _id: req.params.id },
    function (err, data) {
      if (err || !data) {
        res.send({
          status: "KO",
          errDesc: err
            ? err.message
            : `Error borrando categoria ${req.params.id}`,
          info: "",
        });
      } else {
        fs.unlink("." + data.pathIcono, (err) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .send({ status: "KO", info: "", errDesc: err });
          }
          //file removed
        });
        res.send({ status: "OK", info: data, errDesc: "" });
      }
    }
  );
};

exports.update = async (req, res) => {
  let doc = await CategoriaModel.findOne({ _id: req.params.id });
  if (doc !== null) {
    try {
      if (req.file) {
        fs.unlink("." + doc.pathIcono, (err) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .send({ status: "KO", info: "", errDesc: err });
          }
          //file removed
        });

        const { buffer, originalname } = req.file;
        const rndStr = Math.random().toString(36).slice(2);
        const newName = rndStr + originalname.replaceAll(" ", "");

        Object.keys(req.body).forEach((key) => (doc[key] = req.body[key]));
        doc.pathIcono = "/uploads/" + newName;
        doc
          .save()
          .then(async (savedDoc) => {
            await sharp(buffer)
              .png({ quality: 20 })
              .toFile("./uploads/" + newName, (err, info) => {
                if (err) {
                  return res
                    .status(500)
                    .send({ status: "KO", info: "", errDesc: err });
                }
              });
            res.send({ status: "OK", info: savedDoc, errDesc: "" });
          })
          .catch((err) => res.send({ status: "KO", info: {}, errDesc: err }));
      } else {
        Object.keys(req.body).forEach((key) => (doc[key] = req.body[key]));
        doc
          .save()
          .then((savedDoc) => {
            res.send({ status: "OK", info: savedDoc, errDesc: "" });
          })
          .catch((err) => res.send({ status: "KO", info: {}, errDesc: err }));
      }
    } catch (err) {
      if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }
    }
  } else {
    res.send({
      status: "KO",
      errDesc: "Error encontrando la categoria por id",
      info: "",
    });
  }
};
