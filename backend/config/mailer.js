const nodemailer = require("nodemailer");
require("dotenv").config;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.enviarCorreo = (asunto, texto, destinatario) => {
  let mailOptions = {
    to: destinatario,
    subject: asunto,
    html: texto,
  };

  let status = {};
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      status = { status: "KO", info: null, errDesc: error };
    }

    status = { status: "KO", info: info, errDesc: null };
  });

  return status;
};
