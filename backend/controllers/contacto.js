const db = require("../config/dbConfig");
const ContactoModel = db.contacto;
const nodemailer = require("nodemailer");
const mailer = require("../config/mailer");
require("dotenv").config;

exports.all = (req, res) => {
  ContactoModel.find()
    .then((data) => res.send({ status: "OK", errDesc: "", info: data }))
    .catch((err) =>
      res.status(500).send({
        status: "KO",
        errDesc: err.message || "Error obteniendo tratamientos",
      })
    );
};

exports.create = (req, res) => {
  const entrada = new ContactoModel({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    asunto: req.body.asunto,
    mensaje: req.body.mensaje,
    fecha: new Date(),
  });

  entrada
    .save()
    .then((data) => {
      const { status, error, info } = mailer.enviarCorreo(
        `Contacto web: ${req.body.asunto}`,
        `<h1>Datos del contacto:</h1><p>Nombre: ${req.body.nombre} ${req.body.apellido}</p><p>Email: ${req.body.email}}</p><p>Mensaje: ${req.body.mensaje}}</p>`,
        "guidojtorres@gmail.com"
      );

      if (status === "KO") {
        res.send({
          status: "KO",
          info: "",
          errDesc: error ? error : "Error enviando el contacto",
        });
      } else {
        res.send({ status: "OK", info: data, errDesc: "" });
      }
    })
    .catch((e) =>
      res.send({
        status: "KO",
        info: "",
        errDesc: e ? e.message : "Error creando nuevo contacto",
      })
    );
};
