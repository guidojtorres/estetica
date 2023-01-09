const mongoose = require("mongoose");
require("dotenv").config;
const models = require("../models/models");
const dbUser = process.env.DATABASE_USERNAME;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbName = process.env.DATABASE_NAME;
const dbURL = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ebhmb.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbURL;

// Cada modelo se referencia como atributo de db. ej: db.contacto = Model { contactos }

Object.keys(models).forEach((model) => {
  db[model] = models[model];
});

module.exports = db;
