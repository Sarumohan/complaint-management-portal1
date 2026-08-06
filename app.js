const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./connection/db");
const userRoute = require("./routes/user");
const complaintRoute = require("./routes/Complaint");

const app = express();

const PORT = 6990;

connectDB();
app.use(cors());



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/users", userRoute);
app.use("/complaints", complaintRoute);
console.log("User Routes Loaded");

app.listen(PORT, () => {
    console.log(`Server Started at Port ${PORT}`);
});