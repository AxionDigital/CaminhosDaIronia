const Feedback = require("../models/Feedback");
const Solicitacao = require("../models/Solicitacao");
const crypto = require("crypto");

exports.criar = async (req, res) => {
    try {
        const { solicitacaoId,
            mensagem,
            nome,
            telefone,
            hz,
            nivel,
            mental,
            emocional,
            energetico,
            espiritual, } = req.body;

        const token = crypto.randomBytes(20).toString("hex");

        const novo = await Feedback.create({
            solicitacaoId,
            nome,
            telefone,
            mensagem,
            hz,
            nivel,
            mental,
            emocional,
            energetico,
            espiritual,
            status: "pendente"
        });

        await Solicitacao.findByIdAndUpdate(
            solicitacaoId,
            { status: "devolvido" }
        );

        const link = `${process.env.FRONTEND_URL}/area-cliente/${token}`;

        res.status(201).json({
            message: "Feedback criado",
            link
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao salvar feedback" });
    }
};

exports.listar = async (req, res) => {
    try {
        const dados = await Feedback.find().sort({ createdAt: -1 });
        res.json(dados);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar feedbacks" });
    }
};

exports.abrir = async (req, res) => {
    try {
        const feedback = await Feedback.findOne({ token: req.params.token });

        if (!feedback)
            return res.status(404).json({ message: "Feedback não encontrado" });

        res.json(feedback);

    } catch {
        res.status(500).json({ message: "Erro ao buscar feedback" });
    }
};