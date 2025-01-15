const express = require("express");
const MachineStatus = require("../db/models/MachineStatus"); // Caminho correto para o modelo

const router = express.Router();

// Rota para salvar o status da máquina
router.post("/", async (req, res) => {
  const { machine, status } = req.body;

  if (!machine || !status) {
    return res.status(400).json({ error: 'Os campos "machine" e "status" são obrigatórios.' });
  }

  try {
    const newStatus = new MachineStatus({ machine, status });
    await newStatus.save();
    res.status(201).json(newStatus);
  } catch (err) {
    console.error("Erro ao salvar status da máquina:", err);
    res.status(500).json({ error: "Erro ao salvar status da máquina." });
  }
});

// Rota para listar os status das máquinas
router.get("/", async (req, res) => {
  try {
    const statuses = await MachineStatus.find().sort({ timestamp: -1 }); // Ordena do mais recente para o mais antigo
    res.json(statuses);
  } catch (err) {
    console.error("Erro ao buscar status das máquinas:", err);
    res.status(500).json({ error: "Erro ao buscar status das máquinas." });
  }
});

module.exports = router; // Certifique-se de que o router está sendo exportado corretamente
