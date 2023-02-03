const express = require("express");
const router = express.Router();
const controller = require("../controllers/formsController");

router.get("/", controller.login);


module.exports = router;