const express = require("express");
const router = express.Router();
//CREATE nueva entrada de contacto
const TratamientoController = require("../controllers/tratamiento");

router.post("/tratamientos", async (req, res) => {
  TratamientoController.create(req, res);
});

router.get("/tratamientos", async (req, res) => {
  TratamientoController.all(req, res);
});

router.get("/tratamientos/:id", async (req, res) => {
  TratamientoController.find(req, res);
});

module.exports = router;
