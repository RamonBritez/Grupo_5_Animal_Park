// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {index, detail} = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 

router.get('/detail/:id/', detail); 


module.exports = router;
