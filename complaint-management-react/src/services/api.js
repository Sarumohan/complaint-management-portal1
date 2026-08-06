const API = "https://complaint-management-backend-xocq.onrender.com";

export async function loginUser(userData) {

    const response = await fetch(`${API}/users/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(userData)

    });

    return response;

}

export async function registerUser(userData) {

    const response = await fetch(`${API}/users/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(userData)

    });

    return response;

}

export async function getUserComplaints(id) {

    const response = await fetch(
        `${API}/complaints/user/${id}`
    );

    return response;

}