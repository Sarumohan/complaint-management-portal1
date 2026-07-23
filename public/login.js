
const loginForm = document.getElementById("login-form");

const email = document.getElementById("email");
const password = document.getElementById("password");

const message = document.getElementById("login-message");

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    message.innerHTML = "";
    message.style.color = "red";

    const emailValue = email.value.trim().toLowerCase();
    const passwordValue = password.value;

    if (emailValue === "" || passwordValue === "") {

        message.innerHTML = "Please enter email and password.";
        return;

    }

    try {

        const response = await fetch("/users/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                email: emailValue,
                password: passwordValue

            })

        });

        const data = await response.json();

        if (!response.ok) {

            message.innerHTML = data.message;
            return;

        }

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(data.user)
        );

        message.style.color = "green";
        message.innerHTML = data.message;

        loginForm.reset();

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 1500);

    }

    catch (error) {

        console.log(error);

        message.innerHTML = "Unable to connect to server.";

    }

});