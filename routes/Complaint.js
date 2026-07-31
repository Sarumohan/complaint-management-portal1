const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const {
    getAllComplaints,
    getComplaintById,
    createComplaint,
    updateComplaint,
    deleteComplaint,
    getUserComplaints
} = require("../controller/Complaint");


router.get("/", getAllComplaints);


router.get("/user/:userId", getUserComplaints);


router.get("/:id", getComplaintById);


router.post("/", upload.single("photo"), createComplaint);


router.patch("/:id", updateComplaint);

router.delete("/:id", deleteComplaint);

module.exports = router;