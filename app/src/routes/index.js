const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");

router.get("/", controller.index); 


router.get("/error", controller.error);


router.get("/carrito", controller.carrito);

router.get('/search', controller.search); 



module.exports = router;