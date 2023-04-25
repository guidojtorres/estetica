// Cada contacto debe ser un atributo y llevar mongoose para iniciarlizarlo.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  pathIcono: {
    type: String,
    required: true,
  },
  esDestacada: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const TratamientoSchema = new Schema({
  titulo: {
    required: true,
    type: String,
    index: true,
    unique: true,
  },
  pathFotos: { type: [String], required: true, default: undefined },
  subtitulo: {
    required: true,
    type: String,
  },
  descripcion: {
    required: true,
    type: String,
  },
  categorias: {
    type: [Schema.Types.ObjectId],
    ref: "categoria",
    required: true,
    default: undefined,
  },
  esDestacado: {
    type: Boolean,
    default: false,
  },
  dondeEmplear: {
    type: String,
    required: true,
    default: "",
  },
  verMas: {
    type: String,
    required: true,
    default: "",
  },
});

const TurnoSchema = new Schema({
  nombre: {
    required: true,
    type: String,
  },
  apellido: {
    required: true,
    type: String,
  },
  celular: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  asunto: {
    required: true,
    type: String,
  },
  modalidad: {
    type: String,
    required: true,
  },
  metodoDePago: {
    type: Number,
    required: true,
  },
  fuePagado: {
    type: Boolean,
    required: false,
  },
  fecha: {
    required: true,
    type: Date,
    index: true,
    unique: true,
  },
  mensaje: {
    required: false,
    type: String,
  },
  paymentId: {
    required: false,
    type: String,
  },
  referencia: {
    required: false,
    type: String,
  },
  orderId: {
    required: false,
    type: String,
  },
});

const HorariosSchema = new Schema({
  duracion: { type: String, required: true },
  turno: { type: String, required: true },
});

const ReservasSchema = new Schema({
  nombre: {
    required: true,
    type: String,
  },
  apellido: {
    required: true,
    type: String,
  },
  celular: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  asunto: {
    required: true,
    type: String,
  },
  modalidad: {
    type: String,
    required: true,
  },
  metodoDePago: {
    type: Number,
    required: true,
  },
  fuePagado: {
    type: Boolean,
    required: false,
  },
  fecha: {
    required: true,
    type: Date,
    index: true,
    unique: true,
  },
  mensaje: {
    required: false,
    type: String,
  },
  paymentId: {
    required: false,
    type: String,
  },
  referencia: {
    required: false,
    type: String,
  },
  orderId: {
    required: false,
    type: String,
  },
});

const ContactoSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  asunto: { type: String, required: true },
  mensaje: { type: String },
  fecha: { type: String },
});

module.exports = {
  categoria: mongoose.model("categoria", CategoriaSchema),
  tratamiento: mongoose.model("tratamiento", TratamientoSchema),
  turno: mongoose.model("turno", TurnoSchema),
  contacto: mongoose.model("contacto", ContactoSchema),
  horario: mongoose.model("horario", HorariosSchema),
  reserva: mongoose.model("reserva", ReservasSchema),
};
