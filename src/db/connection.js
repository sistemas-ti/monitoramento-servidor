const mongoose = require("mongoose");

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGO_URI; // Obtém o URI do MongoDB do .env ou variável de ambiente
  if (!mongoUri) {
    console.error("MONGO_URI não está definido nas variáveis de ambiente!");
    process.exit(1);
  }
  try {
    await mongoose.connect(mongoUri);
    console.log("Conectado ao MongoDB");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

module.exports = connectToDatabase;
