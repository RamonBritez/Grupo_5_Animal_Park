// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {index, detail, category, pet} = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 

router.get('/detail/:id/', detail); 
router.get("/categories/:id", category);
router.get("/pet/:id", pet);

module.exports = router;

