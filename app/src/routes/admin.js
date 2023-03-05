const express = require("express");
const adminControllers = require("../controllers/adminControllers");
const router = express.Router();

router.get('/', adminControllers.index); 
router.get('/products-list', adminControllers.listProduct);
router.get('/admin-list', adminControllers.listAdmin)

module.exports = router;