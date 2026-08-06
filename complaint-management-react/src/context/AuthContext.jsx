import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {

        const savedUser = localStorage.getItem("loggedInUser");

        return savedUser ? JSON.parse(savedUser) : null;

    });

    function login(userData) {

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(userData)
        );

        setUser(userData);

    }

    function logout() {

        localStorage.removeItem("loggedInUser");

        setUser(null);

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}