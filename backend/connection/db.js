require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        console.log(process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ Database Connected");
    }catch (error) {
    console.error(error);

    if (error.reason?.servers) {
        for (const [host, server] of error.reason.servers) {
            console.log("\nHost:", host);
            console.log(server);
        }
    }
}
    // } catch (error) {
    //     console.log("❌ Database Error:");
    //     console.log(error);
    // }
};

module.exports = connectDB;