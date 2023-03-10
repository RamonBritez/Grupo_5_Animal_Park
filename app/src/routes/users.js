const express = require("express");
const router = express.Router();
const { login, register, processRegister, processLogin, logout, edit, processEdit } = require("../controllers/userController.js");
const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");
const editUserValidator = require("../validations/editUserValidator");
const {isLogged, isVisitor} = require("../middlewares/userCheck")

/* GET - Login Form */
router.get("/login", isVisitor, login); 
/* POST - Login user */
router.post("/login", isVisitor, loginValidator, processLogin);

/* GET - Register form */
router.get("/register", isVisitor, register); 
/* POST - Register user data */
router.post("/register", uploadAvatar.single("avatar"),isVisitor, registerValidator, processRegister);

/* GET - User logout */
router.get("/logout", logout)

/* User Edit */
router.get("/edit/:id", isLogged, edit)
router.put("/edit/:id", uploadAvatar.single("avatar"), editUserValidator, isLogged, processEdit)


module.exports = router;