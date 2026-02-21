const router = require("express").Router();
const controller = require("../controllers/authController");

// LOGIN
router.post("/login", controller.login);

// LOGOUT
router.post("/logout", controller.logout);

module.exports = router;
