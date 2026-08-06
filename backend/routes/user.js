const express = require("express");

const {
    getAllUsers,
    getUserById,
    registerUser,
    loginUser,
    updateProfile
} = require("../controller/user");

const upload = require("../connection/multer");

const router = express.Router();

console.log("user.js loaded");

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put(
    "/profile/:id",
    upload.single("profilePhoto"),
    updateProfile
);

module.exports = router;