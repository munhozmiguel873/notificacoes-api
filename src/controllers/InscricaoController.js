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
    const inscricoes = InscricaoModel.listarTodos();
    res.json(inscricoes);
}


// GET /inscricoes/evento/:eventoId — listar inscrições de um evento
function listarPorEvento(req, res) {
    const eventoId = parseInt(req.params.eventoId);
    // Implemente: use InscricaoModel.listarPorEvento()
    const inscricoes = InscricaoModel.listarPorEvento(eventoId);

    res.json(inscricoes);
}


// PATCH /inscricoes/:id/cancelar — cancelar uma inscrição
function cancelar(req, res) {
    const id = parseInt(req.params.id);
    // Implemente: use InscricaoModel.cancelar()

    const resutado = InscricaoModel.cancelar(id);
    if (!resultado) {
        return res.status(404).json({ erro: "Inscrição não encontrado" });
    }
    res.json(resultado);

}


module.exports = {
    store,
    index,
    listarPorEvento,
    cancelar
};