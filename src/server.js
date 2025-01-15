const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Permite que o backend interprete JSON

// Conectar ao MongoDB
const mongoUri = "mongodb://127.0.0.1:27017/monitoramento"; // Use 127.0.0.1 no lugar de localhost
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Definir o modelo de dados para os status das máquinas
const MachineStatusSchema = new mongoose.Schema({
  machine: { type: String, required: true }, // Nome da máquina
  status: { type: String, required: true },  // Status: "online" ou "offline"
  timestamp: { type: Date, default: Date.now }, // Data/hora de envio
});
const MachineStatus = mongoose.model("MachineStatus", MachineStatusSchema);

// Rota para salvar o status da máquina
app.post("/machine-status", async (req, res) => {
  const { machine, status } = req.body;

  if (!machine || !status) {
    return res.status(400).json({ error: 'Os campos "machine" e "status" são obrigatórios.' });
  }

  try {
    const newStatus = new MachineStatus({ machine, status });
    await newStatus.save();
    res.status(201).json(newStatus); // Retorna o registro criado
  } catch (err) {
    console.error("Erro ao salvar status da máquina:", err);
    res.status(500).json({ error: "Erro ao salvar status da máquina." });
  }
});

// Rota para listar os status das máquinas
app.get("/machine-status", async (req, res) => {
  try {
    const statuses = await MachineStatus.find().sort({ timestamp: -1 }); // Ordena do mais recente para o mais antigo
    res.json(statuses);
  } catch (err) {
    console.error("Erro ao buscar status das máquinas:", err);
    res.status(500).json({ error: "Erro ao buscar status das máquinas." });
  }
});

// Inicializar o servidor
const PORT = 3001; // Porta do backend
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
