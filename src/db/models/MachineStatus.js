const mongoose = require("mongoose");

// Definir o modelo de dados para os status das máquinas
const MachineStatusSchema = new mongoose.Schema({
  machine: { type: String, required: true }, // Nome da máquina
  status: { type: String, required: true },  // Status: "online" ou "offline"
  timestamp: { type: Date, default: Date.now }, // Data/hora de envio
});

const MachineStatus = mongoose.model("MachineStatus", MachineStatusSchema);

module.exports = MachineStatus;
