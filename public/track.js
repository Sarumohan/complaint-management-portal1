const complaintIdInput = document.getElementById("complaint-id");
const trackBtn = document.getElementById("track-btn");

const emptyState = document.getElementById("empty-state");
const complaintCard = document.getElementById("complaint-card");
const timeline = document.getElementById("timeline");

trackBtn.addEventListener("click", trackComplaint);

async function trackComplaint() {

    const complaintId = complaintIdInput.value.trim();

    if (!complaintId) {
        alert("Please enter Complaint ID");
        return;
    }

    try {

        const response = await fetch(`/complaints/${complaintId}`);

        const complaint = await response.json();

        if (!response.ok) {
            alert(complaint.message);
            return;
        }

        emptyState.style.display = "none";
        complaintCard.style.display = "block";
        timeline.style.display = "block";

        document.getElementById("show-id").textContent = complaint._id;
        document.getElementById("show-department").textContent = complaint.department;
        document.getElementById("show-category").textContent = complaint.category;
        document.getElementById("show-location").textContent = complaint.location;
        document.getElementById("show-priority").textContent = complaint.priority;

        document.getElementById("show-date").textContent =
            new Date(complaint.createdAt).toLocaleDateString();

        document.getElementById("submitted-date").textContent =
            new Date(complaint.createdAt).toLocaleString();

        document.getElementById("review-message").textContent =
            "Current Status : " + complaint.status;

        const status = document.getElementById("complaint-status");

        status.textContent = complaint.status;

        status.className = "status";

        if (complaint.status === "Pending") {

            status.classList.add("pending");

        } else if (complaint.status === "In Progress") {

            status.classList.add("progress");

        } else {

            status.classList.add("resolved");

        }

    } catch (error) {

        alert(error.message);

    }

}