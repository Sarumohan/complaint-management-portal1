require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");

        await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log("✅ Database Connected");
    } catch (error) {
        console.error("❌ Database Connection Error:", error);
    }
};

module.exports = connectDB;