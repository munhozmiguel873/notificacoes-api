// src/models/InscricaoModel.js
const EventoModel = require("./EventoModel");
const ParticipanteModel = require("./ParticipanteModel");
let inscricoes = [];
let proximoId = 1;
// Criar uma nova inscrição
function criar(eventoId, participanteId) {
    // Verificar se o evento existe
    const evento = EventoModel.buscarPorId(eventoId);
    if (!evento) return { erro: "Evento não encontrado" };
    // Verificar se o participante existe
    const participante = ParticipanteModel.buscarPorId(participanteId);
    if (!participante) return { erro: "Participante não encontrado" };
    // Verificar se já está inscrito
    const jaInscrito = inscricoes.find(
        (i) => i.eventoId === eventoId && i.participanteId === participanteId,
    );
    if (jaInscrito) return { erro: "Participante já inscrito neste evento" };
    const novaInscricao = {
        id: proximoId,
        eventoId,
        participanteId,
        dataInscricao: new Date().toISOString(),
        status: "confirmada",
    };
    proximoId++;
    inscricoes.push(novaInscricao);
    return novaInscricao;
}
// Listar inscrições de um evento específico
function listarPorEvento(eventoId) {
    return inscricoes.filter((i) => i.eventoId === eventoId);
}
// Listar todas as inscrições
function listarTodas() {

    return inscricoes;
}
// Cancelar uma inscrição
function cancelar(id) {
    const index = inscricoes.findIndex((i) => i.id === id);
    if (index === -1) return null;
    inscricoes[index].status = "cancelada";
    return inscricoes[index];
}
module.exports = {
    criar,
    listarPorEvento,
    listarTodas,
    cancelar,
};
// src/controllers/InscricaoController.js
const InscricaoModel = require("../models/InscricaoModel");
// POST /inscricoes — criar uma inscrição
function store(req, res) {
    const { eventoId, participanteId } = req.body;
    if (!eventoId || !participanteId) {
        return res
            .status(400)
            .json({ erro: "eventoId e participanteId são obrigatórios" });
    }
    const resultado = InscricaoModel.criar(
        parseInt(eventoId),
        parseInt(participanteId),
    );
    // Se o resultado tem a propriedade "erro", algo deu errado
    if (resultado.erro) {
        return res.status(400).json(resultado);
    }
    res.status(201).json(resultado);
}
// GET /inscricoes — listar todas
function index(req, res) {
    // Implemente: retorne todas as inscrições
    // _________________________________
}
// GET /inscricoes/evento/:eventoId — listar inscrições de um evento
function listarPorEvento(req, res) {
    const eventoId = parseInt(req.params.eventoId);
    // Implemente: use InscricaoModel.listarPorEvento()
    const inscrição = InscricaoModel.listarPorEvento(evento)
}
// PATCH /inscricoes/:id/cancelar — cancelar uma inscrição
function cancelar(req, res) {
    const id = parseInt(req.params.id);
    // Implemente: use InscricaoModel.cancelar()

    // Se retornar null, responda 404
    // Se retornar a inscrição, responda com ela
    const resultado = incriçaoModel.cancelar(id);
}
module.exports = { store, index, listarPorEvento, cancelar };