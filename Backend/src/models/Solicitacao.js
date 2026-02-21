const mongoose = require("mongoose");

const schema = new mongoose.Schema(
{
  nome: { type: String, required: true },
  nascimento: String,
  whatsapp: { type: String, required: true },
  tema: String,
  mensagem: { type: String, required: true },
  status: {
    type: String,
    default: "pendente"
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Solicitacao", schema);