const router = require("express").Router();
const controller = require("../controllers/feedbackController");
const auth = require("../middleware/auth");

router.post("/", auth, controller.criar);
router.get("/", auth, controller.listar);
router.get("/abrir/:token", controller.abrir);

module.exports = router;