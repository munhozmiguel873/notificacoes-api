// src/routes/eventoRoutes.js
const express = require("express");
const router = express.Router();

const ParticipanteController = require("../controllers/ParticipanteController");

router.get("/", ParticipanteController.index); // GET /participantes
router.get("/:id", ParticipanteController.show); // GET /participantes/:id
router.post("/", ParticipanteController.store); // POST /participantes
router.put("/:id", ParticipanteController.update); // PUT /participantes/:id
router.delete("/:id", ParticipanteController.destroy); // DELETE /participantes/:id

module.exports = router;