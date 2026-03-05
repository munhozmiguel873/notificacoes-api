// src/routes/eventoRoutes.js
const express = require("express");
const router = express.Router();
const EventoController = require("../controllers/EventoController");
router.get("/", EventoController.index); // GET /eventos
router.get("/:id", EventoController.show); // GET /eventos/:id
router.post("/", EventoController.store); // POST /eventos
router.put("/:id", EventoController.update); // PUT /eventos/:id
router.delete("/:id", EventoController.destroy); // DELETE /eventos/:id
module.exports = router;