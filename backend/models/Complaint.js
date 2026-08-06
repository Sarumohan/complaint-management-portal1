const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    department: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    location: {
        type: String
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
    photo: {
     type: String
    },


    status: {
        type: String,
        enum: ["Pending", "In Progress", "Resolved"],
        default: "Pending"
    }
    

}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);