require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db/connection");
const machineRoutes = require("./routes/machineRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
connectToDatabase(process.env.MONGO_URI);

// Rotas
app.use("/machine-status", machineRoutes);

// Inicializar o servidor
const PORT = process.env.PORT || 3000; // Use a porta definida no .env ou uma porta padrão
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
