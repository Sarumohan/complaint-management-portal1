import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import "../styles/dashboard.css";

function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const [complaints, setComplaints] = useState([]);

    async function loadDashboard() {

        try {

            const response = await fetch(
                 `https://complaint-management-backend-xocq.onrender.com/complaints/user/${user._id}`
            );

            if (!response.ok) {

                throw new Error("Failed to fetch complaints");

            }

            const data = await response.json();

            setComplaints(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {

        if (user?._id) {

            loadDashboard();

        }

    }, []);

    return (

        <Layout>

            <section className="welcome">

                <h1>

                    Welcome Back, {user?.fullName}! 👋

                </h1>

                <p>

                    Manage your complaints easily through the Complaint Management Portal.

                </p>

            </section>

            <section className="stats">

                <div className="card blue">

                    <i className="fa-solid fa-file-lines"></i>

                    <h2>

                        {complaints.length}

                    </h2>

                    <p>Total Complaints</p>

                </div>

                <div className="card orange">

                    <i className="fa-solid fa-hourglass-half"></i>

                    <h2>

                        {
                            complaints.filter(
                                complaint =>
                                    complaint.status === "Pending"
                            ).length
                        }

                    </h2>

                    <p>Pending</p>

                </div>

                <div className="card purple">

                    <i className="fa-solid fa-arrows-rotate"></i>

                    <h2>

                        {
                            complaints.filter(
                                complaint =>
                                    complaint.status === "In Progress"
                            ).length
                        }

                    </h2>

                    <p>In Progress</p>

                </div>

                <div className="card green">

                    <i className="fa-solid fa-circle-check"></i>

                    <h2>

                        {
                            complaints.filter(
                                complaint =>
                                    complaint.status === "Resolved"
                            ).length
                        }

                    </h2>

                    <p>Resolved</p>

                </div>

            </section>

            <section className="quick-actions">

                <Link
                    to="/complaint"
                    className="action-card"
                >

                    <i className="fa-solid fa-pen-to-square"></i>

                    <div>

                        <h3>

                            Register Complaint

                        </h3>

                        <p>

                            Submit a new complaint.

                        </p>

                    </div>

                </Link>

                <Link
                    to="/track"
                    className="action-card"
                >

                    <i className="fa-solid fa-location-crosshairs"></i>

                    <div>

                        <h3>

                            Track Complaint

                        </h3>

                        <p>

                            Check complaint status.

                        </p>

                    </div>

                </Link>

            </section>
                        <section className="recent">

                <div className="recent-header">

                    <h2>

                        Recent Complaints

                    </h2>

                </div>

                {

                    complaints.length === 0 ?

                    (

                        <div className="empty-state">

                            <i className="fa-regular fa-folder-open"></i>

                            <h3>

                                No complaints yet!

                            </h3>

                            <p>

                                You haven't submitted any complaint.

                            </p>

                            <Link
                                to="/complaint"
                            >

                                Register Your First Complaint

                            </Link>

                        </div>

                    )

                    :

                    (

                        complaints
                        .slice()
                        .reverse()
                        .slice(0,5)
                        .map((complaint)=>(

                            <div
                                key={complaint._id}
                                className="recent-card"
                            >

                                <h3>

                                    {complaint.title}

                                </h3>

                                <p>

                                    <strong>ID:</strong>{" "}

                                    {complaint._id}

                                </p>

                                <p>

                                    <strong>Category:</strong>{" "}

                                    {complaint.category}

                                </p>

                                <p>

                                    <strong>Status:</strong>{" "}

                                    {complaint.status}

                                </p>

                                <p>

                                    <strong>Priority:</strong>{" "}

                                    {complaint.priority}

                                </p>

                            </div>

                        ))

                    )

                }

            </section>

        </Layout>

    );

}

export default Dashboard;