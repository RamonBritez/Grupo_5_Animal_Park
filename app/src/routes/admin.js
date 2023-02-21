const express = require("express");
const adminControllers = require("../controllers/adminControllers");
const router = express.Router();
const controller = require("../controllers/indexController");


router.get('/', adminControllers.index); 


module.exports = router;