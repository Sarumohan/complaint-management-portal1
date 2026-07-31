const User = require("../models/User");
const bcrypt = require("bcrypt");

// Get All Users
const getAllUsers = async (req, res) => {

    try {

        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get User By ID
const getUserById = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Register User
const registerUser = async (req, res) => {

    try {

        // Check if email already exists
        const existingUser = await User.findOne({
            email: req.body.email
        });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already exists."
            });

        }

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Replace plain password with hashed password
        req.body.password = hashedPassword;

        // Create user
        const user = await User.create(req.body);

        res.status(201).json({
            message: "User Registered Successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Login User
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {

            return res.status(401).json({
                message: "Invalid Password"
            });

        }

        res.status(200).json({
            message: "Login Successful",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    loginUser
};