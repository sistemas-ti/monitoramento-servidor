const express = require('express');
const cors = require('cors');
const app = express();

// Domínios permitidos
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://monitoramento-frontend-zeta.vercel.app'] // Substitua pelo domínio correto do frontend
  : ['http://localhost:3000', 'http://127.0.0.1:3000']; // Permitir localhost para desenvolvimento

// Configuração do CORS com validação de origem
app.use(cors({
  origin: (origin, callback) => {
    // Permitir requisições sem origem (ex: Postman ou backend)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Origem não permitida pelo CORS: ${origin}`);
      callback(new Error(`Origem não permitida: ${origin}`));
    }
  },
}));

// Middleware para parsing de JSON
app.use(express.json());

// Porta de execução
const PORT = process.env.PORT || 3001;

// Endpoint para retornar status do servidor
app.post('/status', (req, res) => {
  const { server } = req.body;

  if (!server) {
    console.error("Requisição inválida: Campo 'server' não enviado.");
    return res.status(400).json({
      error: "O campo 'server' é obrigatório."
    });
  }

  console.log(`[${new Date().toISOString()}] Requisição recebida do servidor: ${server}`);

  // Gerar dados fictícios de status
  const status = {
    server,
    cpuUsage: `${(Math.random() * 100).toFixed(2)}%`,
    memoryUsage: `${(Math.random() * 100).toFixed(2)}%`,
    status: "Online",
    timestamp: new Date().toISOString(),
  };

  res.json(status);
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Erro no servidor:`, err.stack);
  res.status(500).json({ error: "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde." });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
