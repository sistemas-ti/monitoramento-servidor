// routes/machineStatus.js (ou o nome que você estiver utilizando)
// Certifique-se de que o caminho para o modelo MachineStatus está correto
const express = require("express");
const MachineStatus = require("../db/models/MachineStatus");

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

    // Contagem total de registros na coleção
    const totalRegistros = await MachineStatus.countDocuments();
    
    if (totalRegistros >= 50) {
      // Define a data limite: registros com timestamp menor que essa data serão considerados antigos (mais de 1 dia)
      const dataLimite = new Date(Date.now() - 86400000); // 1 dia atrás
      // Remove os registros antigos
      const resultado = await MachineStatus.deleteMany({ timestamp: { $lt: dataLimite } });
      console.log(`Foram removidos ${resultado.deletedCount} registros antigos.`);
    }

    res.status(201).json(newStatus);
  } catch (err) {
    console.error("Erro ao salvar status da máquina:", err);
    res.status(500).json({ error: "Erro ao salvar status da máquina." });
  }
});

// Rota para listar os status das máquinas
router.get("/", async (req, res) => {
  try {
    const statuses = await MachineStatus.find().sort({ timestamp: -1 });
    res.json(statuses);
  } catch (err) {
    console.error("Erro ao buscar status das máquinas:", err);
    res.status(500).json({ error: "Erro ao buscar status das máquinas." });
  }
});

module.exports = router;
