const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const userRoute = require("./routes/user");
const complaintRoute = require("./routes/Complaint");

const app = express();

const PORT = 6990;

connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/users", userRoute);
app.use("/complaints", complaintRoute);

app.listen(PORT, () => {
    console.log(`Server Started at Port ${PORT}`);
});