const router = require("express").Router();
const controller = require("../controllers/solicitacaoController");
const auth = require("../middleware/auth");

router.post("/solicitacoes", controller.criar);
router.get("/solicitacoes", auth, controller.listar);
router.patch("/solicitacoes/:id", auth, controller.atualizarStatus);

module.exports = router;