console.log("user.js loaded");
const express = require("express");
const router = express.Router();

const upload = require("../connection/multer");

const {

    getAllUsers,
    getUserById,
    registerUser,
    loginUser,
    updateUser

} = require("../controller/user");


router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.patch(

    "/:id",

    upload.single("profilePhoto"),

    updateUser

);

module.exports = router;