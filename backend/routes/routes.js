const express = require("express");
const router = express.Router();
//CREATE nueva entrada de contacto
const TratamientoController = require("../controllers/tratamiento");
const CategoriaController = require("../controllers/categoria");
const TurnoController = require("../controllers/turno");
const ContactoController = require("../controllers/contacto");
const HorarioController = require("../controllers/horario");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage,
});
router.post("/tratamientos", upload.array("images", 5), async (req, res) => {
  TratamientoController.create(req, res);
});

router.get("/tratamientos", async (req, res) => {
  TratamientoController.all(req, res);
});

router.get("/tratamientos/:id", async (req, res) => {
  TratamientoController.find(req, res);
});

router.delete("/tratamientos/:id", async (req, res) => {
  TratamientoController.delete(req, res);
});

router.put("/tratamientos/:id", upload.array("images", 5), async (req, res) => {
  TratamientoController.update(req, res);
});

router.post("/categorias", upload.single("images"), async (req, res) => {
  CategoriaController.create(req, res);
});

router.get("/categorias", async (req, res) => {
  CategoriaController.all(req, res);
});

router.get("/categorias/:id", async (req, res) => {
  CategoriaController.find(req, res);
});

router.put("/categorias/:id", upload.single("images"), async (req, res) => {
  CategoriaController.update(req, res);
});

router.delete("/categorias/:id", async (req, res) => {
  CategoriaController.delete(req, res);
});

router.post("/turnos", async (req, res) => {
  TurnoController.create(req, res);
});

router.get("/turnos/:id", async (req, res) => {
  TurnoController.find(req, res);
});

router.get("/turnos", async (req, res) => {
  TurnoController.all(req, res);
});

router.delete("/turnos/:id", async (req, res) => {
  TurnoController.delete(req, res);
});

router.put("/turnos/:id", async (req, res) => {
  TurnoController.update(req, res);
});

router.post("/contactos", async (req, res) => {
  ContactoController.create(req, res);
});

router.get("/contactos", async (req, res) => {
  ContactoController.all(req, res);
});

router.put("/horarios", async (req, res) => {
  HorarioController.update(req, res);
});

module.exports = router;
