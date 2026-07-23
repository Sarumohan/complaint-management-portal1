
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    alert("Please login first.");
    window.location.href = "login.html";
}

const userName = document.getElementById("user-name");
const profileImage = document.getElementById("profile-image");

if (userName) {
    userName.textContent = loggedInUser.fullName;
}

if (profileImage && loggedInUser.profilePhoto) {
    profileImage.src = loggedInUser.profilePhoto;
}

async function loadDashboard() {

    try {

        const response = await fetch(`/complaints/user/${loggedInUser._id}`);

        if (!response.ok) {
            throw new Error("Failed to fetch complaints");
        }

        const complaints = await response.json();

        document.getElementById("total-complaints").textContent =
            complaints.length;

        document.getElementById("pending-count").textContent =
            complaints.filter(c => c.status === "Pending").length;

        document.getElementById("progress-count").textContent =
            complaints.filter(c => c.status === "In Progress").length;

        document.getElementById("resolved-count").textContent =
            complaints.filter(c => c.status === "Resolved").length;

        document.getElementById("notification-count").textContent =
            complaints.filter(c => c.status !== "Resolved").length;

        const recentComplaints =
            document.getElementById("recent-complaints");

        const emptyState =
            document.getElementById("empty-state");

        recentComplaints.innerHTML = "";

        if (complaints.length === 0) {

            emptyState.style.display = "block";

        } else {

            emptyState.style.display = "none";

            complaints
                .slice(-5)
                .reverse()
                .forEach(complaint => {

                    recentComplaints.innerHTML += `

                        <div class="recent-card">

                            <h3>${complaint.title}</h3>

                            <p><strong>ID:</strong> ${complaint._id}</p>

                            <p><strong>Category:</strong> ${complaint.category}</p>

                            <p><strong>Status:</strong> ${complaint.status}</p>

                            <p><strong>Priority:</strong> ${complaint.priority}</p>

                        </div>

                    `;

                });

        }

    } catch (error) {

        console.error(error);

        alert("Unable to load dashboard.");

    }

}

loadDashboard();

const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        if (confirm("Are you sure you want to logout?")) {

            localStorage.removeItem("loggedInUser");

            window.location.href = "login.html";

        }

    });

}