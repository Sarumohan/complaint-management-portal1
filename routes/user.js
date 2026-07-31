const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    registerUser,
    loginUser
} = require("../controller/user");


router.get("/", getAllUsers);


router.get("/:id", getUserById);


router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;