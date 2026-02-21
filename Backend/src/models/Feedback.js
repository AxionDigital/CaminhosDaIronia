const mongoose = require("mongoose");
const crypto = require("crypto");

const FeedbackSchema = new mongoose.Schema({
  solicitacaoId: { type: String, required: true, index: true },
  nome: String,
  telefone: String,
  mensagem: String,
  hz: Number,
  nivel: String,
  mental: String,
  emocional: String,
  energetico: String,
  espiritual: String,

  token: {
    type: String,
    default: () => crypto.randomBytes(20).toString("hex"),
    unique: true
  },

  status: {
    type: String,
    enum: ["pendente", "enviado", "lido"],
    default: "pendente"
  },

  expiraEm: {
    type: Date,
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
  }

}, { timestamps: true });

module.exports = mongoose.model("Feedback", FeedbackSchema);