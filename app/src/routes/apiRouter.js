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

router
  .get("/users", getUsers)
  .get("/users/:id", getUserById)

module.exports = router;
