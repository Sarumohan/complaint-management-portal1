const User = require("../models/user");
const bcrypt = require("bcrypt");

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

const getUserById = async (req, res) => {

    try {

        const user = await User.findById(req.params.id).select("-password").lean();

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

const registerUser = async (req, res) => {

    try {

        const existingUser = await User.findOne({
            email: req.body.email
        }).select("_id").lean();

        if (existingUser) {

            return res.status(400).json({
                message: "Email already exists."
            });

        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        req.body.password = hashedPassword;

        const user = await User.create(req.body);

        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).json({
            message: "User Registered Successfully",
            user: userObj
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email }).lean();

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

        delete user.password;

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

const updateProfile = async (req, res) => {

    try {

        if (req.file) {

            req.body.profilePhoto = req.file.filename;

        }

        const user = await User.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        ).select("-password").lean();

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        res.status(200).json({

            message: "Profile Updated Successfully",

            user

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    loginUser,
    updateProfile
};