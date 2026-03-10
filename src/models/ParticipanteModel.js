// src/models/ParticipanteModel.js
let participantes = [
    { id: 1, nome: "Ana Silva", email: "ana@email.com" },
    { id: 2, nome: "Carlos Souza", email: "carlos@email.com" },
    { id: 3, nome: "Maria Santos", email: "maria@email.com" },
];
let proximoId = 4;

// Retorna todos os participantes
function listarTodos() {
    return participantes;
}

// Busca um participante pelo ID
function buscarPorId(id) {
    return participantes.find((p) => p.id === id) || null;
}

// Cria um novo participante
function criar(dados) {
    const novoParticipante = {
        id: proximoId,
        nome: dados.nome,
        email: dados.email,
    };
    proximoId++;
    participantes.push(novoParticipante);
    return novoParticipante;
}

// Atualiza um participante existente
function atualizar(id, dados) {
    const index = participantes.findIndex((p) => p.id === id);
    if (index === -1) return null; // Não encontrado

    participantes[index] = { ...participantes[index], ...dados };
    return participantes[index];
}

// Deleta um participante
function deletar(id) {
    const index = participantes.findIndex((p) => p.id === id);
    if (index === -1) return false; // Não encontrado

    participantes.splice(index, 1);
    return true;
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};