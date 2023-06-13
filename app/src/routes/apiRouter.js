const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  loginUser
} = require("../controllers/Apis/user.api");
const {getProductById, getProducts}=require("../controllers/Apis/product.api");
const loginValidator = require("../validations/loginValidator");
const validate = require("../validations/indexValidator")

router
  .get("/users", getUsers)
  .get("/users/:id", getUserById)
  .post("/users/login", loginValidator, validate, loginUser)

router
  .get("/products", getProducts)
  .get("/products/:id", getProductById)

module.exports = router;
