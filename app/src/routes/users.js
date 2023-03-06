const express = require("express");
const router = express.Router();
const { login, register, processRegister, processLogin, logout, edit, processEdit } = require("../controllers/userController.js");
const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");
const editUserValidator = require("../validations/editUserValidator");


/* GET - Login Form */
router.get("/login", login); 
/* POST - Login user */
router.post("/login", loginValidator, processLogin);

/* GET - Register form */
router.get("/register", register); 
/* POST - Register user data */
router.post("/register", uploadAvatar.single("avatar"), registerValidator, processRegister);

/* GET - User logout */
router.get("/logout", logout)

/* User Edit */
router.get("/edit/:id", edit)
router.put("/edit/:id", uploadAvatar.single("avatar"), editUserValidator, processEdit)


module.exports = router;