const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    registerUser,
    loginUser
} = require("../controller/user");

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

module.exports = router;