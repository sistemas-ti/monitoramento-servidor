// routes/machineStatus.js
const express = require("express");
const MachineStatus = require("../db/models/MachineStatus");
const cron = require("node-cron");

const router = express.Router();

// Rota para salvar o status da máquina
router.post("/", async (req, res) => {
  const { machine, status } = req.body;

  if (!machine || !status) {
    return res
      .status(400)
      .json({ error: 'Os campos "machine" e "status" são obrigatórios.' });
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
    const statuses = await MachineStatus.find().sort({ timestamp: -1 });
    res.json(statuses);
  } catch (err) {
    console.error("Erro ao buscar status das máquinas:", err);
    res.status(500).json({ error: "Erro ao buscar status das máquinas." });
  }
});

// Agendamento para remoção de todos os registros a cada 1 hora, se > 250 registros
cron.schedule("0 * * * *", async () => {
  try {
    const count = await MachineStatus.countDocuments();

    if (count > 250) {
      const resultado = await MachineStatus.deleteMany({});
      console.log(
        `Cron job: Removidos ${resultado.deletedCount} registros em ${new Date().toLocaleString()}`
      );
    } else {
      console.log(
        `Cron job: Não há registros suficientes para remoção (atualmente ${count} registros).`
      );
    }
  } catch (error) {
    console.error("Erro ao executar o cron job:", error);
  }
});

module.exports = router;
