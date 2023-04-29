const express = require("express");
const { validationResult } = require("express-validator");
const {index,
    destroyUser,
    processEdit,
    listAdmin,
    listProduct,
    userEdit,
    bannerEdit,
    bannerProcess,
    create,
    store,
    edit,
    update,
    productDestroy,
} = require("../controllers/adminControllers");
const router = express.Router();

/* middlewares*/
const uploadAvatar = require("../middlewares/uploadAvatar");
const {isAdmin} = require("../middlewares/userCheck")
const editUserValidator = require("../validations/editUserValidator");
const uploadBanner = require("../middlewares/uploadBanner");
const productValidator = require('../validations/productValidator');
const upload = require('../middlewares/uploadProducts')


//Home Admin
router.get('/', isAdmin, index);

//Listar
router.get('/products-list', isAdmin, listProduct);
router.get('/admin-list', isAdmin ,listAdmin)

//Controles de usuario
router.get('/user-edit/:id', isAdmin ,userEdit)
router.put('/user-edit/:id' ,uploadAvatar.single("avatar"), isAdmin ,editUserValidator ,processEdit)
router.delete('/delete/:id', isAdmin, destroyUser)

//Controles de Productos
router.get('/productCreate', isAdmin, create); 
router.post('/productCreate', upload.uploadImageProduct.array('image'), isAdmin, productValidator, store); 
router.get('/productEdit/:id', isAdmin, edit); 
router.put('/productUpdate/:id',  upload.uploadImageProduct.array('image'), isAdmin, productValidator, update); 
router.delete('/productDelete/:id', isAdmin, productDestroy); 

//Manipulacion de banners
router.get("/banner-edit", isAdmin, bannerEdit)
router.post("/banner-edit/:id", uploadBanner.single("img"), isAdmin, bannerProcess)


module.exports = router;