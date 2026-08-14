import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/complaint.css";

const API = "https://complaint-management-backend-xocq.onrender.com";

function Profile() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("profile.png");
    const [newPhoto, setNewPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("green");

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        const loggedUser = JSON.parse(
            localStorage.getItem("loggedInUser")
        );

        if (!loggedUser || !loggedUser._id) return;

        try {
            const response = await fetch(
                `${API}/users/${loggedUser._id}`
            );
            const data = await response.json();

            setFullName(data.fullName || "");
            setEmail(data.email || "");
            setPhone(data.phone || "");
            setAddress(data.address || "");

            if (data.profilePhoto) {
                setProfilePhoto(data.profilePhoto);
            }
        } catch (error) {
            console.log("Error loading profile:", error);
        }
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setNewPhoto(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");

        const loggedUser = JSON.parse(
            localStorage.getItem("loggedInUser")
        );

        if (!loggedUser || !loggedUser._id) return;

        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("phone", phone);
        formData.append("address", address);

        if (newPhoto) {
            formData.append("profilePhoto", newPhoto);
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${API}/users/profile/${loggedUser._id}`,
                {
                    method: "PUT",
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessageColor("red");
                setMessage(data.message || "Failed to update profile.");
                return;
            }

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(data.user)
            );

            if (data.user && data.user.profilePhoto) {
                setProfilePhoto(data.user.profilePhoto);
            }

            setNewPhoto(null);
            setPreviewUrl(null);
            setMessageColor("green");
            setMessage("Profile updated successfully!");

        } catch (error) {
            console.log("Error updating profile:", error);
            setMessageColor("red");
            setMessage("Something went wrong while updating profile.");
        } finally {
            setLoading(false);
        }
    }

    const currentImageSrc = previewUrl 
        ? previewUrl 
        : `${API}/uploads/${profilePhoto}?t=${Date.now()}`;

    return (
        <Layout>
            <section className="complaint-card">
                <div className="heading">
                    <h1>My Profile</h1>
                    <p>View and update your personal information.</p>
                </div>

                {message && (
                    <div style={{
                        color: messageColor,
                        marginBottom: "15px",
                        textAlign: "center",
                        fontWeight: "600"
                    }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginBottom: "30px"
                        }}
                    >
                        <img
                            src={currentImageSrc}
                            alt="Profile"
                            style={{
                                width: "140px",
                                height: "140px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "4px solid #2563eb",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                            }}
                        />
                        {previewUrl && (
                            <span style={{ fontSize: "12px", color: "#2563eb", marginTop: "8px", fontWeight: "500" }}>
                                Preview of selected image
                            </span>
                        )}
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
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
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group full">
                        <label>Change Profile Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="buttons">
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading ? (
                                <span>
                                    <i className="fa-solid fa-circle-notch fa-spin"></i> Saving Changes...
                                </span>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </form>
            </section>
        </Layout>
    );
}

export default Profile;
