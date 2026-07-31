
const registerForm = document.getElementById("register-form");

const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const terms = document.getElementById("terms");

const message = document.getElementById("register-message");



registerForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    message.innerHTML = "";
    message.style.color = "red";

    const nameValue = fullName.value.trim();
    const emailValue = email.value.trim().toLowerCase();
    const phoneValue = phone.value.trim();
    const passwordValue = password.value;
    const confirmValue = confirmPassword.value;

    // Validation

    if (
        nameValue === "" ||
        emailValue === "" ||
        phoneValue === "" ||
        passwordValue === "" ||
        confirmValue === ""
    ) {

        message.innerHTML = "Please fill all fields.";
        return;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {

        message.innerHTML = "Enter a valid email.";
        return;

    }

    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phoneValue)) {

        message.innerHTML = "Phone number must contain exactly 10 digits.";
        return;

    }

    if (passwordValue.length < 6) {

        message.innerHTML = "Password must be at least 6 characters.";
        return;

    }

    if (passwordValue !== confirmValue) {

        message.innerHTML = "Passwords do not match.";
        return;

    }

    if (!terms.checked) {

        message.innerHTML = "Please accept the Terms & Conditions.";
        return;

    }

    // User Object

    const newUser = {

        fullName: nameValue,

        email: emailValue,

        phone: phoneValue,

        password: passwordValue,

        address: "",

        profilePhoto: "profile.png"

    };

    try {

        const response = await fetch("/users/register", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(newUser)

        });

        const data = await response.json();

        if (!response.ok) {

            message.innerHTML = data.message;
            return;

        }

        message.style.color = "green";
        message.innerHTML = data.message;

        registerForm.reset();

        setTimeout(() => {

            window.location.href = "login.html";

        }, 2000);

    }

    catch (error) {

        console.log(error);

        message.innerHTML = "Server Error.";

    }

});