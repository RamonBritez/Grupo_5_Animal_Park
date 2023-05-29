const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  login,
} = require("../controllers/Apis/user.api");
const {getProductById, getProducts}=require("../controllers/Apis/product.api");

router
  .get("/users", getUsers)
  .get("/users/:id", getUserById)

router
  .get("/products", getProducts)
  .get("/products/:id", getProductById)

module.exports = router;
