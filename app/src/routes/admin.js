const express = require("express");
const adminControllers = require("../controllers/adminControllers");
const router = express.Router();

/* middlewares*/
const uploadAvatar = require("../middlewares/uploadAvatar");
const {isAdmin} = require("../middlewares/userCheck")
const editUserValidator = require("../validations/editUserValidator");


router.get('/', isAdmin, adminControllers.index); 
router.get('/products-list', isAdmin, adminControllers.listProduct);
router.get('/admin-list', isAdmin ,adminControllers.listAdmin)

router.get('/user-edit/:id', isAdmin ,adminControllers.userEdit)
router.put('/user-edit/:id', isAdmin ,uploadAvatar.single("avatar"), editUserValidator ,adminControllers.userEdit)
router.delete('/delete/:id', isAdmin, adminControllers.destroy)


module.exports = router;