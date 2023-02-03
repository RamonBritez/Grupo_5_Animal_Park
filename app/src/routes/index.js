const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");

router.get("/", controller.index); 

router.get("/login", controller.login)

router.get("/error", controller.error)

router.get("/detalleProducto", controller.detalleProducto)

module.exports = router;