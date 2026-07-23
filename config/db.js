const mongoose = require("mongoose");

const connectDB = async () => {

    try {

        await mongoose.connect("mongodb://127.0.0.1:27017/complaint_portal");

        console.log("Database Connected");

    }
    catch (error) {

        console.log(error);

        process.exit(1);

    }

}

module.exports = connectDB;