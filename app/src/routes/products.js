// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadProducts')
const {isAdmin} = require("../middlewares/userCheck")

// ************ Controller Require ************
const {index, create, store, detail, edit, update, destroy} = require('../controllers/productsController');
const productValidator = require('../validations/productValidator');

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', isAdmin, create); 
router.post('/', upload.uploadImageProduct.array('image'), isAdmin, productValidator, store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', isAdmin, edit); 
router.put('/update/:id',  upload.uploadImageProduct.array('image'), isAdmin, productValidator, update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', isAdmin, destroy); 




module.exports = router;
