import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/complaint.css";

function History() {

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const [complaints, setComplaints] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    async function loadComplaints() {

        try {

            const response = await fetch(

                `https://complaint-management-backend-xocq.onrender.com/complaints/user/${user._id}`

            );

            if (!response.ok) {

                throw new Error("Failed to fetch complaints");

            }

            const data = await response.json();

            data.reverse();

            setComplaints(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {

        loadComplaints();

    }, []);

    const filteredComplaints = complaints.filter((complaint) => {

        const matchesSearch =

            complaint.title
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            complaint._id
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =

            statusFilter === "All"

            ||

            complaint.status === statusFilter;

        return matchesSearch && matchesStatus;

    });

    return (

        <Layout>

            <section className="complaint-card">

                <div className="heading">

                    <h1>

                        Complaint History

                    </h1>

                    <p>

                        View all your submitted complaints.

                    </p>

                </div>

                <div className="form-grid">

                    <div className="form-group">

                        <label>

                            Search Complaint

                        </label>

                        <input

                            type="text"

                            placeholder="Search by ID or Title"

                            value={search}

                            onChange={(e)=>

                                setSearch(e.target.value)

                            }

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Filter Status

                        </label>

                        <select

                            value={statusFilter}

                            onChange={(e)=>

                                setStatusFilter(e.target.value)

                            }

                        >

                            <option>

                                All

                            </option>

                            <option>

                                Pending

                            </option>

                            <option>

                                In Progress

                            </option>

                            <option>

                                Resolved

                            </option>

                        </select>

                    </div>

                </div>
                                <div className="history-table">

                    <table>

                        <thead>

                            <tr>

                                <th>Complaint ID</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Department</th>
                                <th>Priority</th>
                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredComplaints.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            style={{
                                                textAlign:"center",
                                                padding:"30px"
                                            }}
                                        >

                                            No complaints found.

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    filteredComplaints.map((complaint)=>(

                                        <tr
                                            key={complaint._id}
                                        >

                                            <td>

                                                {complaint._id}

                                            </td>

                                            <td>

                                                {complaint.title}

                                            </td>

                                            <td>

                                                {complaint.category}

                                            </td>

                                            <td>

                                                {complaint.department}

                                            </td>

                                            <td>

                                                {complaint.priority}

                                            </td>

                                            <td>

                                                <span

                                                    className={

                                                        complaint.status === "Resolved"

                                                        ?

                                                        "status resolved"

                                                        :

                                                        complaint.status === "Pending"

                                                        ?

                                                        "status pending"

                                                        :

                                                        "status progress"

                                                    }

                                                >

                                                    {complaint.status}

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </section>

        </Layout>

    );

}

export default History;