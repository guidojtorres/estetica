// Cada contacto debe ser un atributo y llevar mongoose para iniciarlizarlo.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  pathIcono: {
    type: String,
    required: true,
  },
});

const TratamientoSchema = new Schema({
  titulo: {
    required: true,
    type: String,
  },
  pathFoto: {
    required: true,
    type: String,
  },
  subtitulo: {
    required: true,
    type: String,
  },
  descripcion: {
    required: true,
    type: String,
  },
  categorias: [
    {
      type: Schema.Types.ObjectId,
      ref: "categoria",
      required: true,
    },
  ],
});

module.exports = {
  categoria: mongoose.model("categorias", CategoriaSchema),
  tratamiento: mongoose.model("tratamientos", TratamientoSchema),
};
