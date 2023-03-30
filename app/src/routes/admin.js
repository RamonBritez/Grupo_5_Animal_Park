const express = require("express");
const {index, destroy ,processEdit, listAdmin, listProduct, userEdit, bannerEdit, bannerProcess} = require("../controllers/adminControllers");
const router = express.Router();

/* middlewares*/
const uploadAvatar = require("../middlewares/uploadAvatar");
const {isAdmin} = require("../middlewares/userCheck")
const editUserValidator = require("../validations/editUserValidator");
const uploadBanner = require("../middlewares/uploadBanner");


router.get('/', isAdmin, index); 
router.get('/products-list', isAdmin, listProduct);
router.get('/admin-list', isAdmin ,listAdmin)

router.get('/user-edit/:id', isAdmin ,userEdit)
router.put('/user-edit/:id' ,uploadAvatar.single("avatar"), isAdmin ,editUserValidator ,processEdit)
router.delete('/delete/:id', isAdmin, destroy)

router.get("/banner-edit", isAdmin, bannerEdit)
router.post("/banner-edit/:id", uploadBanner.single("img"), isAdmin, bannerProcess)


module.exports = router;