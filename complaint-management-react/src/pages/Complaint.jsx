import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/complaint.css";

function Complaint() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    const [fullName] = useState(user?.fullName || "");
    const [email] = useState(user?.email || "");
    const [phone] = useState(user?.phone || "");

    const [department, setDepartment] = useState("");
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [photo, setPhoto] = useState(null);
    const [confirm, setConfirm] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        if (
            !department ||
            !category ||
            !title ||
            !description
        ) {

            alert("Please fill all required fields.");
            return;

        }

        if (!confirm) {

            alert("Please confirm the information.");
            return;

        }

        const formData = new FormData();

        formData.append("userId", user._id);
        formData.append("department", department);
        formData.append("category", category);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("priority", priority);

        if (photo) {

            formData.append("photo", photo);

        }

        try {

            const response = await fetch(

                "http://localhost:6990/complaints",

                {

                    method: "POST",

                    body: formData

                }

            );

            const data = await response.json();

            if (!response.ok) {

                alert(data.message);
                return;

            }

            alert("Complaint Registered Successfully");

            setDepartment("");
            setCategory("");
            setTitle("");
            setDescription("");
            setLocation("");
            setPriority("Medium");
            setPhoto(null);
            setConfirm(false);

            navigate("/dashboard");

        }

        catch (error) {

            console.log(error);

            alert("Something went wrong");

        }

    }

    return (

        <Layout>

            <section className="complaint-card">

                <div className="heading">

                    <h1>

                        Register a New Complaint

                    </h1>

                    <p>

                        Fill in the information below to submit your complaint.

                    </p>

                </div>

                <form onSubmit={handleSubmit}><div className="form-grid">

    <div className="form-group">

        <label>Full Name</label>

        <input
            type="text"
            value={fullName}
            readOnly
        />

    </div>

    <div className="form-group">

        <label>Email Address</label>

        <input
            type="email"
            value={email}
            readOnly
        />

    </div>

    <div className="form-group">

        <label>Phone Number</label>

        <input
            type="text"
            value={phone}
            readOnly
        />

    </div>

    <div className="form-group">

        <label>Department</label>

        <select
            value={department}
            onChange={(e)=>setDepartment(e.target.value)}
        >

            <option value="">Select Department</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Electricity">electricity</option>
            <option value="Food and Transport">Food and Transport</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Municipality">Munacipality</option>
            <option value="other">other</option>

        </select>

    </div>

</div>

<div className="form-group full">

    <label>Complaint Category</label>

    <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
    >

        <option value="">Select Category</option>
        <option value="Technical">Technical</option>
        <option value="Infrastructure">Infrastructure</option>
        <option value="Harassment">Harassment</option>
        <option value="Service">Service</option>
        <option value="Other">Other</option>

    </select>

</div>

<div className="form-group full">

    <label>Complaint Title</label>

    <input
        type="text"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="Enter complaint title"
    />

</div>

<div className="form-group full">

    <label>Complaint Description</label>

    <textarea
        rows="6"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        placeholder="Describe your complaint..."
    ></textarea>

</div>

<div className="form-grid">

    <div className="form-group">

        <label>Location</label>

        <input
            type="text"
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
            placeholder="Complaint location"
        />

    </div>

    <div className="form-group">

        <label>Upload Image / Document</label>

        <input
            type="file"
            onChange={(e)=>setPhoto(e.target.files[0])}
        />

    </div>

</div>

<div className="priority">

    <label>Priority</label>

    <div className="priority-options">

        <label>

            <input
                type="radio"
                name="priority"
                value="Low"
                checked={priority==="Low"}
                onChange={(e)=>setPriority(e.target.value)}
            />

            Low

        </label>

        <label>

            <input
                type="radio"
                name="priority"
                value="Medium"
                checked={priority==="Medium"}
                onChange={(e)=>setPriority(e.target.value)}
            />

            Medium

        </label>

        <label>

            <input
                type="radio"
                name="priority"
                value="High"
                checked={priority==="High"}
                onChange={(e)=>setPriority(e.target.value)}
            />

            High

        </label>

    </div>

</div>

<div className="confirm">

    <label>

        <input
            type="checkbox"
            checked={confirm}
            onChange={(e)=>setConfirm(e.target.checked)}
        />

        I confirm that the information provided is correct.

    </label>

</div>

<div className="buttons">

    <button
        type="button"
        className="back-btn"
        onClick={()=>navigate("/dashboard")}
    >

        Back to Dashboard

    </button>

    <button
        type="submit"
        className="submit-btn"
    >

        Submit Complaint

    </button>

</div>

</form>

</section>

</Layout>

);

}

export default Complaint;