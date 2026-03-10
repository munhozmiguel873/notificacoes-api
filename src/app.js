// src/app.js
const express = require("express");
const app = express();

// Middleware para ler JSON no body
app.use(express.json());

// Importar rotas
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");

// Usar rotas com prefixo
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);

// Rota raiz (informativa)
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Notificações",
        rotas: {
            eventos: "/eventos",
            participantes: "/participantes",
        },
    });
});

module.exports = app;