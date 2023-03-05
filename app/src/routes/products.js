// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadProducts')

// ************ Controller Require ************
const {index, create, store, detail, edit, update, destroy} = require('../controllers/productsController');
const productValidator = require('../validations/productValidator');

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', create); 
router.post('/', upload.uploadImageProduct.single('image'), productValidator, store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', edit); 
router.put('/update/:id', upload.uploadImageProduct.single('image'), productValidator, update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', destroy); 




module.exports = router;
