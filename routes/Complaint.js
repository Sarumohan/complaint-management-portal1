const express = require("express");
const router = express.Router();

const {
    getAllComplaints,
    getComplaintById,
    createComplaint,
    updateComplaint,
    deleteComplaint,
    getUserComplaints
} = require("../controller/Complaint");

// Get all complaints
router.get("/", getAllComplaints);

router.get("/user/:userId", getUserComplaints);

// Get complaint by ID
router.get("/:id", getComplaintById);

// Create complaint
router.post("/", createComplaint);

// Update complaint
router.patch("/:id", updateComplaint);

// Delete complaint
router.delete("/:id", deleteComplaint);

module.exports = router;