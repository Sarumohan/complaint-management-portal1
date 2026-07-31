const emptyState = document.getElementById("empty-state");
const historyTable = document.getElementById("history-table");
const complaintBody = document.getElementById("complaint-body");

const searchInput = document.getElementById("history-search");
const statusFilter = document.getElementById("status-filter");

let complaints = [];

window.onload = loadComplaints;

async function loadComplaints() {

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(`/complaints/user/${loggedInUser._id}`);

        complaints = await response.json();

        displayComplaints(complaints);

    } catch (error) {

        console.log(error);

    }

}

function displayComplaints(data) {

    complaintBody.innerHTML = "";

    if (data.length === 0) {

        emptyState.style.display = "block";
        historyTable.style.display = "none";
        return;

    }

    emptyState.style.display = "none";
    historyTable.style.display = "block";

    data.forEach((complaint) => {

        const row = document.createElement("tr");

        let statusClass = "";

        if (complaint.status === "Pending") {

            statusClass = "pending";

        } else if (complaint.status === "In Progress") {

            statusClass = "progress";

        } else {

            statusClass = "resolved";

        }

        row.innerHTML = `
            <td>${complaint._id}</td>
            <td>${complaint.category}</td>
            <td>${complaint.department}</td>

            <td>
                <span class="${statusClass}">
                    ${complaint.status}
                </span>
            </td>

            <td>
                ${new Date(complaint.createdAt).toLocaleDateString()}
            </td>

            <td>
                <button class="view-btn">
                    View
                </button>
            </td>
        `;

        complaintBody.appendChild(row);

    });

}
searchInput.addEventListener("input", filterComplaints);

statusFilter.addEventListener("change", filterComplaints);

function filterComplaints() {

    const search = searchInput.value.toLowerCase();

    const status = statusFilter.value;

    const filtered = complaints.filter((complaint) => {

        const matchSearch =
            complaint._id.toLowerCase().includes(search);

        const matchStatus =
            status === "all" ||
            complaint.status.toLowerCase() === status;

        return matchSearch && matchStatus;

    });

    displayComplaints(filtered);

}