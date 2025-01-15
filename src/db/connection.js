const mongoose = require("mongoose");

const connectToDatabase = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("Conectado ao MongoDB");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

module.exports = connectToDatabase;
