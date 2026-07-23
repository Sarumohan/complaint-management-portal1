const express = require("express");
const connectDB = require("./config/db");
const userRoute = require("./routes/user");
const complaintRoute = require("./routes/Complaint");

const app = express();

const PORT = 6990;
connectDB();


// midlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));


app.use(express.static("public"));
app.use("/users", userRoute);
app.use("/complaints", complaintRoute);

app.listen(PORT, () => {
    console.log(`Server Started at Port ${PORT}`);
});