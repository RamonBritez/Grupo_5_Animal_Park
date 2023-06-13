const express = require("express");
const router = express.Router();
const { carrito, comprar, index, search, aboutUs } = require("../controllers/indexController")

const {isLogged} = require("../middlewares/userCheck")

router.get("/", index); 


//router.get("/error", controller.error);


router.get("/carrito", isLogged, carrito);
router.post("/carrito/:id", isLogged, comprar)

router.get('/search', search); 
router.get('/aboutUs', aboutUs); 



module.exports = router;