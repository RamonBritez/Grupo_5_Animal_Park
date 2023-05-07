const express = require("express");
const router = express.Router();
const { login, register, processRegister, processLogin, logout, profile, edit, processEdit, destroyUser } = require("../controllers/userController.js");
const uploadAvatar = require("../middlewares/uploadAvatar");
const userInSessionCheck = require("../middlewares/userInSessionCheck");
const registerValidator = require("../validations/registerValidator.js");
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
router.get("/logout", logout);

/* GET - User profile */
router.get("/profile", userInSessionCheck, profile);

/* User Edit */
router.get("/profile/edit", isLogged, edit);
router.put("/profile/edit", uploadAvatar.single("avatar"), editUserValidator, isLogged, processEdit);
router.delete("/profile/delete/", destroyUser);


module.exports = router;