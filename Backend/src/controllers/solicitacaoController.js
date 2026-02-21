const Solicitacao = require("../models/Solicitacao");

exports.criar = async (req, res) => {
  try {
    const nova = await Solicitacao.create(req.body);
    res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ message: "Erro ao salvar solicitação" });
  }
};

exports.listar = async (req, res) => {
  const dados = await Solicitacao.find().sort({ createdAt: -1 });
  res.json(dados);
};

exports.atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["aprovado", "recusado"].includes(status)) {
      return res.status(400).json({ message: "Status inválido" });
    }

    const solicitacao = await Solicitacao.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!solicitacao) {
      return res.status(404).json({ message: "Solicitação não encontrada" });
    }

    res.json(solicitacao);

  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar status" });
  }
};