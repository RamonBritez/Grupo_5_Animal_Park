const express = require("express");
const {index, destroy ,processEdit, listAdmin, listProduct, userEdit} = require("../controllers/adminControllers");
const router = express.Router();

/* middlewares*/
const uploadAvatar = require("../middlewares/uploadAvatar");
const {isAdmin} = require("../middlewares/userCheck")
const editUserValidator = require("../validations/editUserValidator");


router.get('/', isAdmin, index); 
router.get('/products-list', isAdmin, listProduct);
router.get('/admin-list', isAdmin ,listAdmin)

router.get('/user-edit/:id', isAdmin ,userEdit)
router.put('/user-edit/:id' ,uploadAvatar.single("avatar"), isAdmin ,editUserValidator ,processEdit)
router.delete('/delete/:id', isAdmin, destroy)


module.exports = router;