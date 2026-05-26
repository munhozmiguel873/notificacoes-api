const { Inscricao, Evento, Participante } = require('../models');

const { NotFoundError, ValidationError } = require('../errors/AppError');

const appEmitter = require('../events/eventEmitter');

// ======================================================
// CRIAR INSCRIÇÃO
// ======================================================

async function criar(dados) {

    const { eventoId, participanteId } = dados;

    // Verificar se evento existe

    const evento = await Evento.findByPk(eventoId);

    if (!evento) {
        throw new NotFoundError('Evento');
    }

    // Verificar se participante existe

    const participante = await Participante.findByPk(participanteId);

    if (!participante) {
        throw new NotFoundError('Participante');
    }

    // Verificar duplicidade de inscrição

    const jaInscrito = await Inscricao.findOne({
        where: {
            evento_id: eventoId,
            participante_id: participanteId,
        },
    });

    if (jaInscrito) {
        throw new ValidationError(
            'Participante já inscrito neste evento'
        );
    }

    // Criar inscrição

    const novaInscricao = await Inscricao.create({
        evento_id: eventoId,
        participante_id: participanteId,
    });

    // Emitir evento

    appEmitter.emit('inscricao:criada', novaInscricao);

    return novaInscricao;
}

// ======================================================
// LISTAR TODAS
// ======================================================

async function listarTodas() {

    const inscricoes = await Inscricao.findAll({

        include: [
            {
                model: Evento,
                as: 'evento',
                attributes: ['id', 'nome', 'data'],
            },
            {
                model: Participante,
                as: 'participante',
                attributes: ['id', 'nome', 'email'],
            },
        ],

        order: [['created_at', 'DESC']],
    });

    return inscricoes;
}

// ======================================================
// LISTAR POR EVENTO
// ======================================================

async function listarPorEvento(eventoId) {

    const evento = await Evento.findByPk(eventoId);

    if (!evento) {
        throw new NotFoundError('Evento');
    }

    const inscricoes = await Inscricao.findAll({

        where: {
            evento_id: eventoId,
        },

        include: [
            {
                model: Participante,
                as: 'participante',
                attributes: ['nome', 'email'],
            },
        ],

        order: [['created_at', 'DESC']],
    });

    return inscricoes;
}

// ======================================================
// CANCELAR INSCRIÇÃO
// ======================================================

async function cancelar(id) {

    const inscricao = await Inscricao.findByPk(id);

    if (!inscricao) {
        throw new NotFoundError('Inscrição');
    }

    await inscricao.update({
        status: 'cancelada',
    });

    // Emitir evento

    appEmitter.emit('inscricao:cancelada', inscricao);

    return inscricao;
}

// ======================================================
// EXPORTAÇÕES
// ======================================================

module.exports = {
    criar,
    listarTodas,
    listarPorEvento,
    cancelar,
};