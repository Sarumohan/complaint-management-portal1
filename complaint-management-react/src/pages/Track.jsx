import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/complaint.css";

function Track() {

    const [complaintId, setComplaintId] = useState("");

    const [complaint, setComplaint] = useState(null);

    const [error, setError] = useState("");

    async function handleSearch(e) {

        e.preventDefault();

        setError("");

        setComplaint(null);

        if (!complaintId.trim()) {

            setError("Please enter Complaint ID.");

            return;

        }

        try {

            const response = await fetch(

                `http://localhost:6990/complaints/${complaintId}`

            );

            const data = await response.json();

            if (!response.ok) {

                setError(data.message);

                return;

            }

            setComplaint(data);

        }

        catch (error) {

            console.log(error);

            setError("Unable to connect to server.");

        }

    }

    return (

        <Layout>

            <section className="complaint-card">

                <div className="heading">

                    <h1>

                        Track Complaint

                    </h1>

                    <p>

                        Enter your Complaint ID to check the current status.

                    </p>

                </div>

                {

                    error &&

                    <div className="error-message">

                        {error}

                    </div>

                }

                <form onSubmit={handleSearch}>

                    <div className="form-group full">

                        <label>

                            Complaint ID

                        </label>

                        <input

                            type="text"

                            placeholder="Enter Complaint ID"

                            value={complaintId}

                            onChange={(e)=>

                                setComplaintId(e.target.value)

                            }

                        />

                    </div>

                    <div className="buttons">

                        <button

                            type="submit"

                            className="submit-btn"

                        >

                            Track Complaint

                        </button>

                    </div>

                </form>
                                {

                    complaint &&

                    <div
                        style={{
                            marginTop:"35px",
                            borderTop:"1px solid #e5e7eb",
                            paddingTop:"30px"
                        }}
                    >

                        <h2
                            style={{
                                marginBottom:"25px",
                                color:"#0f172a"
                            }}
                        >

                            Complaint Details

                        </h2>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>Complaint ID</label>

                                <input
                                    type="text"
                                    value={complaint._id}
                                    readOnly
                                />

                            </div>

                            <div className="form-group">

                                <label>Status</label>

                                <input
                                    type="text"
                                    value={complaint.status}
                                    readOnly
                                />

                            </div>

                            <div className="form-group">

                                <label>Department</label>

                                <input
                                    type="text"
                                    value={complaint.department}
                                    readOnly
                                />

                            </div>

                            <div className="form-group">

                                <label>Category</label>

                                <input
                                    type="text"
                                    value={complaint.category}
                                    readOnly
                                />

                            </div>

                            <div className="form-group">

                                <label>Priority</label>

                                <input
                                    type="text"
                                    value={complaint.priority}
                                    readOnly
                                />

                            </div>

                            <div className="form-group">

                                <label>Location</label>

                                <input
                                    type="text"
                                    value={complaint.location || "Not Provided"}
                                    readOnly
                                />

                            </div>

                        </div>

                        <div className="form-group full">

                            <label>Complaint Title</label>

                            <input
                                type="text"
                                value={complaint.title}
                                readOnly
                            />

                        </div>

                        <div className="form-group full">

                            <label>Description</label>

                            <textarea
                                value={complaint.description}
                                readOnly
                            ></textarea>

                        </div>

                        <div className="form-group full">

                            <label>Created On</label>

                            <input
                                type="text"
                                value={new Date(
                                    complaint.createdAt
                                ).toLocaleString()}
                                readOnly
                            />

                        </div>

                    </div>

                }

            </section>

        </Layout>

    );

}

export default Track;