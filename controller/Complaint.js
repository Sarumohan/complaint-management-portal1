const Complaint = require("../models/Complaint");

// Get all complaints
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get complaint by ID
const getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        res.status(200).json(complaint);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create complaint
const createComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.create(req.body);

        res.status(201).json({
            message: "Complaint Registered Successfully",
            complaint
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update complaint
const updateComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            message: "Complaint Updated Successfully",
            complaint
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete complaint
const deleteComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndDelete(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            message: "Complaint Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getUserComplaints = async (req, res) => {

    try {

        const complaints = await Complaint.find({
            userId: req.params.userId
        });

        res.status(200).json(complaints);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getAllComplaints,
    getComplaintById,
    createComplaint,
    updateComplaint,
    deleteComplaint,
    getUserComplaints
};