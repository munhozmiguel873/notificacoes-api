// src/app.js
const express = require("express");
const app = express();
// Middleware para ler JSON no body
app.use(express.json());
// Importar rotas
const eventoRoutes = require("./routes/eventoRoutes");
// Usar rotas com prefixo
app.use("/eventos", eventoRoutes);
// Rota raiz (informativa)
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Notificações",
        rotas: {
            eventos: "/eventos",
        },
    });
});
module.exports = app;