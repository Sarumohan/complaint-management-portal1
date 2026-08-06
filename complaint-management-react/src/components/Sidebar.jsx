import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    function logout(){

        localStorage.removeItem("loggedInUser");

        navigate("/login");

    }

    return(

        <aside className="sidebar">

            <div className="logo">

                <i className="fa-solid fa-shield-halved"></i>

                <h2>Complaint Portal</h2>

            </div>

            <ul className="menu">

                <li>
                    <NavLink to="/dashboard">
                        <i className="fa-solid fa-house"></i>
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/complaint">
                        <i className="fa-solid fa-file-circle-plus"></i>
                        Register Complaint
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/track">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        Track Complaint
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/history">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        Complaint History
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/notification">
                        <i className="fa-regular fa-bell"></i>
                        Notifications
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/profile">
                        <i className="fa-regular fa-user"></i>
                        My Profile
                    </NavLink>
                </li>

            </ul>

            <div className="logout">

                <button onClick={logout}>

                    <i className="fa-solid fa-right-from-bracket"></i>

                    Logout

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;