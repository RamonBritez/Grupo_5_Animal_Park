// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const productValidator = require('../validations/productValidator');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 
router.get('/list', productsController.listAdmin); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.uploadImageProduct.single('image'), productValidator, productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/update/:id', upload.uploadImageProduct.single('image'), productValidator, productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
