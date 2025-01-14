const express = require('express');
const cors = require('cors');
const app = express();

// Defina os domínios permitidos para CORS.
// Em produção, inclua a URL do seu front-end hospedado no Vercel.
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://monitoramento-frontend-zeta.vercel.app'] // Você pode adicionar mais domínios se necessário
  : ['http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins
}));

app.use(express.json());

// Utiliza a porta definida na variável de ambiente ou a porta 3001 para desenvolvimento local.
const PORT = process.env.PORT || 3001;

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

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Ocorreu um erro no servidor." });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
