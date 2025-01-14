const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Permitindo origem localhost:3000
}));
app.use(express.json());

const PORT = 3001;

app.post('/status', (req, res) => {
    const { server } = req.body;

    if (!server) {
        return res.status(400).json({
            error: "O campo 'server' é obrigatório."
        });
    }

    console.log(`[${new Date().toISOString()}] Requisição recebida de: ${server}`);

    const status = {
        server: server,
        cpuUsage: `${(Math.random() * 100).toFixed(2)}%`,
        memoryUsage: `${(Math.random() * 100).toFixed(2)}%`,
        status: "Online",
        timestamp: new Date().toISOString()
    };

    res.json(status);
});

// Middleware para erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Ocorreu um erro no servidor." });
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
