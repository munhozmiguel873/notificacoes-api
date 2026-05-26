// src/services/NotificacaoService.js

const { sequelize, Notificacao, Inscricao, Evento, Participante } = require('../models');

const EmailService = require('./EmailService');

const { NotFoundError } = require('../errors/AppError');

// ======================================================
// LISTAR TODAS AS NOTIFICAÇÕES
// ======================================================

async function listarTodas(filtros = {}) {

    const where = {};

    // Filtrar por tipo
    // Exemplo: confirmacao, lembrete

    if (filtros.tipo) {
        where.tipo = filtros.tipo;
    }

    // Filtrar por status de envio

    if (filtros.enviada !== undefined) {
        where.enviada = filtros.enviada === 'true';
    }

    const notificacoes = await Notificacao.findAll({
        where,

        include: [
            {
                model: Inscricao,
                as: 'inscricao',

                include: [
                    {
                        model: Evento,
                        as: 'evento',
                        attributes: ['id', 'nome'],
                    },
                    {
                        model: Participante,
                        as: 'participante',
                        attributes: ['id', 'nome', 'email'],
                    },
                ],
            },
        ],

        order: [['created_at', 'DESC']],
    });

    return notificacoes;
}

// ======================================================
// BUSCAR NOTIFICAÇÃO POR ID
// ======================================================

async function buscarPorId(id) {

    const notificacao = await Notificacao.findByPk(id, {

        include: [
            {
                model: Inscricao,
                as: 'inscricao',

                include: [
                    {
                        model: Evento,
                        as: 'evento',
                    },
                    {
                        model: Participante,
                        as: 'participante',
                    },
                ],
            },
        ],
    });

    if (!notificacao) {
        throw new NotFoundError('Notificação');
    }

    return notificacao;
}

// ======================================================
// REENVIAR NOTIFICAÇÃO
// ======================================================

async function reenviar(id) {

    const notificacao = await buscarPorId(id);

    const html = notificacao.conteudo;

    try {

        const resultado = await EmailService.enviar(
            notificacao.destinatario_email,
            notificacao.assunto,
            html
        );

        // Atualiza status de envio

        await notificacao.update({
            enviada: true,
            data_envio: new Date(),
        });

        return {
            notificacao,
            visualizarEm: resultado.visualizarEm,
        };

    } catch (erro) {

        // Salva falha no histórico

        await notificacao.update({
            enviada: false,
        });

        throw erro;
    }
}

// ======================================================
// ESTATÍSTICAS
// ======================================================

async function obterEstatisticas() {

    const total = await Notificacao.count();

    const enviadas = await Notificacao.count({
        where: {
            enviada: true,
        },
    });

    const pendentes = await Notificacao.count({
        where: {
            enviada: false,
        },
    });

    const porTipo = await Notificacao.findAll({

        attributes: [
            'tipo',

            [
                sequelize.fn('COUNT', sequelize.col('id')),
                'quantidade',
            ],
        ],

        group: ['tipo'],

        raw: true,
    });

    return {

        total,

        enviadas,

        pendentes,

        taxaEnvio:
            total > 0
                ? `${Math.round((enviadas / total) * 100)}%`
                : '0%',

        porTipo,
    };
}

// ======================================================
// EXPORTAÇÕES
// ======================================================

module.exports = {

    listarTodas,

    buscarPorId,

    reenviar,

    obterEstatisticas,
};