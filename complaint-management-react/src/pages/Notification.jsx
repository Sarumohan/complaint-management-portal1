import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/complaint.css";

function Notification() {

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {

        loadNotifications();

    }, []);

    async function loadNotifications() {

        try {

            const response = await fetch(

                `http://localhost:6990/complaints/user/${user._id}`

            );

            if (!response.ok) {

                throw new Error("Failed to fetch notifications");

            }

            const data = await response.json();

            data.reverse();

            setComplaints(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <Layout>

            <section className="complaint-card">

                <div className="heading">

                    <h1>

                        Notifications

                    </h1>

                    <p>

                        Stay updated with your complaint activities.

                    </p>

                </div>
                                {

                    complaints.length === 0 ?

                    (

                        <div className="empty-state">

                            <i className="fa-regular fa-bell-slash"></i>

                            <h3>

                                No Notifications Yet

                            </h3>

                            <p>

                                Your complaint updates will appear here.

                            </p>

                        </div>

                    )

                    :

                    (

                        complaints.map((complaint) => (

                            <div
                                key={complaint._id}
                                className="notification-card"
                            >

                                <div className="notification-icon">

                                    {

                                        complaint.status === "Resolved" ?

                                        <i className="fa-solid fa-circle-check"></i>

                                        :

                                        complaint.status === "In Progress" ?

                                        <i className="fa-solid fa-spinner"></i>

                                        :

                                        <i className="fa-solid fa-hourglass-half"></i>

                                    }

                                </div>

                                <div className="notification-content">

                                    <h3>

                                        {complaint.title}

                                    </h3>

                                    <p>

                                        {

                                            complaint.status === "Resolved"

                                            ?

                                            "Your complaint has been resolved."

                                            :

                                            complaint.status === "In Progress"

                                            ?

                                            "Your complaint is currently in progress."

                                            :

                                            "Your complaint has been submitted successfully and is pending."

                                        }

                                    </p>

                                    <small>

                                        {new Date(complaint.createdAt).toLocaleString()}

                                    </small>

                                </div>

                                <span

                                    className={

                                        complaint.status === "Resolved"

                                        ?

                                        "status resolved"

                                        :

                                        complaint.status === "In Progress"

                                        ?

                                        "status progress"

                                        :

                                        "status pending"

                                    }

                                >

                                    {complaint.status}

                                </span>

                            </div>

                        ))

                    )

                }

            </section>

        </Layout>

    );

}

export default Notification;