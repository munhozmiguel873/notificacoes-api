const express = require("express");
const router = express.Router();

const InscricaoController = require("../controllers/InscricaoController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Inscricao:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         eventoId:
 *           type: integer
 *         participanteId:
 *           type: integer
 *         dataInscricao:
 *           type: string
 *         status:
 *           type: string
 *           enum: [confirmada, cancelada]
 *       example:
 *         id: 1
 *         eventoId: 1
 *         participanteId: 1
 *         dataInscricao: "2025-08-01T10:30:00.000Z"
 *         status: confirmada
 */

/**
 * @swagger
 * /inscricoes:
 *   post:
 *     summary: Criar uma inscrição
 *     tags: [Inscrições]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventoId
 *               - participanteId
 *             properties:
 *               eventoId:
 *                 type: integer
 *               participanteId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Inscrição criada
 *       400:
 *         description: Dados inválidos
 */
router.post("/", InscricaoController.store);

/**
 * @swagger
 * /inscricoes:
 *   get:
 *     summary: Listar todas as inscrições
 *     tags: [Inscrições]
 *     responses:
 *       200:
 *         description: Lista de inscrições
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inscricao'
 */
router.get("/", InscricaoController.index);

/**
 * @swagger
 * /inscricoes/evento/{eventoId}:
 *   get:
 *     summary: Listar inscrições por evento
 *     tags: [Inscrições]
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de inscrições do evento
 */
router.get("/evento/:eventoId", InscricaoController.listarPorEvento);

/**
 * @swagger
 * /inscricoes/{id}/cancelar:
 *   patch:
 *     summary: Cancelar uma inscrição
 *     tags: [Inscrições]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inscrição cancelada
 *       404:
 *         description: Inscrição não encontrada
 */
router.patch("/:id/cancelar", InscricaoController.cancelar);

module.exports = router;






















router.post("/", InscricaoController.store);
router.get("/", InscricaoController.index);
router.get("/evento/:eventoId", InscricaoController.listarPorEvento);
router.patch("/:id/cancelar", InscricaoController.cancelar);

module.exports = router;