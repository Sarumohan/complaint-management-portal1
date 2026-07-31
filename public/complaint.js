

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    alert("Please login first.");
    window.location.href = "login.html";
}

const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const profileImage = document.getElementById("profile-image");
const userName = document.getElementById("user-name");

if (userName) {
    userName.textContent = loggedInUser.fullName;
}

if (profileImage && loggedInUser.profilePhoto) {
    profileImage.src = loggedInUser.profilePhoto;
}

fullName.value = loggedInUser.fullName;
email.value = loggedInUser.email;
phone.value = loggedInUser.phone;

fullName.readOnly = true;
email.readOnly = true;
phone.readOnly = true;

const form = document.getElementById("complaint-form");

const department = document.getElementById("department");
const category = document.getElementById("category");
const title = document.getElementById("complaint-title");
const description = document.getElementById("description");
const locationInput = document.getElementById("location");
const photo = document.getElementById("photo");

const priority = document.getElementsByName("priority");

const terms = document.getElementById("terms");

const message = document.getElementById("complaint-message");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    message.style.color = "red";
    message.innerHTML = "";

    if (department.value === "") {
        message.innerHTML = "Please select department.";
        return;
    }

    if (category.value === "") {
        message.innerHTML = "Please select category.";
        return;
    }

    if (title.value.trim() === "") {
        message.innerHTML = "Please enter complaint title.";
        return;
    }

    if (description.value.trim() === "") {
        message.innerHTML = "Please enter complaint description.";
        return;
    }

    let selectedPriority = "";

    priority.forEach((item) => {
        if (item.checked) {
            selectedPriority = item.value;
        }
    });

    if (selectedPriority === "") {
        message.innerHTML = "Please select priority.";
        return;
    }

    if (!terms.checked) {
        message.innerHTML = "Please accept the declaration.";
        return;
    }

    const formData = new FormData();

    formData.append("userId", loggedInUser._id);
    formData.append("department", department.value);
    formData.append("category", category.value);
    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("location", locationInput.value);
    formData.append("priority", selectedPriority);

    if (photo.files.length > 0) {
        formData.append("photo", photo.files[0]);
    }

    try {

        const response = await fetch("/complaints", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            message.innerHTML = data.message;
            return;
        }

        message.style.color = "green";
        message.innerHTML = "Complaint Registered Successfully!";

        form.reset();

        fullName.value = loggedInUser.fullName;
        email.value = loggedInUser.email;
        phone.value = loggedInUser.phone;

        fullName.readOnly = true;
        email.readOnly = true;
        phone.readOnly = true;

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);

    } catch (error) {

        console.log(error);

        message.innerHTML = "Server Error.";

    }

});