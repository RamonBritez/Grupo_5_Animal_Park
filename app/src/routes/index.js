const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");
const {isLogged} = require("../middlewares/userCheck")

router.get("/", controller.index); 


router.get("/error", controller.error);


router.get("/carrito", isLogged, controller.carrito);

router.get('/search', controller.search); 



module.exports = router;