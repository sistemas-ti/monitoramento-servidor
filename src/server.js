require("dotenv").config(); // Carrega variáveis do .env
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db/connection");
const machineRoutes = require("./routes/machineRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
connectToDatabase();

// Rotas
app.use("/machine-status", machineRoutes);

// Inicializar o servidor
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});