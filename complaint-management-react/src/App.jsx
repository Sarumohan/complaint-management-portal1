import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { pingServer } from "./services/api";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint";
import Track from "./pages/Track";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Notification from "./pages/Notification";


function App() {

    useEffect(() => {
        pingServer();
    }, []);

    return (

        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/complaint" element={<Complaint />} />
            <Route path="/track" element={<Track />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notification" element={<Notification />} />


        </Routes>

    );

}

export default App;