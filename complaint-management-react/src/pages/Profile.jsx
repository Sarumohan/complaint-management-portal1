import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/complaint.css";

function Profile() {

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("profile.png");
    const [newPhoto, setNewPhoto] = useState(null);

    useEffect(() => {

        loadProfile();

    }, []);

    // async function loadProfile() {

    //     try {

    //         const response = await fetch(

    //             `http://localhost:6990/users/${user._id}`

    //         );

    //         const data = await response.json();

    //         setFullName(data.fullName);
    //         setEmail(data.email);
    //         setPhone(data.phone);
    //         setAddress(data.address);

    //         if (data.profilePhoto) {

    //             setProfilePhoto(data.profilePhoto);

    //         }

    //     }

    //     catch (error) {

    //         console.log(error);

    //     }

    // }
    async function loadProfile() {

    const loggedUser = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    console.log(loggedUser);

    try {

        const response = await fetch(

            `https://complaint-management-backend-xocq.onrender.com/users/${loggedUser._id}`

        );

        console.log(response.status);

        const data = await response.json();

        console.log(data);

        setFullName(data.fullName);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);

        if (data.profilePhoto) {

            setProfilePhoto(data.profilePhoto);

        }

    }

    catch (error) {

        console.log(error);

    }

}

    // async function handleSubmit(e) {

    //     e.preventDefault();

    //     const formData = new FormData();

    //     formData.append("fullName", fullName);
    //     formData.append("phone", phone);
    //     formData.append("address", address);

    //     if (newPhoto) {

    //         formData.append(
    //             "profilePhoto",
    //             newPhoto
    //         );

    //     }

    //     try {

    //       console.log("User ID:", user._id);

    //       const url = `http://localhost:6990/users/${user._id}`;

    //        console.log(url);

    //        const response = await fetch(url, {
    //          method: "PATCH",
    //          body: formData
    //         });

    //         console.log("Status:", response.status);

    //         const data = await response.json();

    //         if(!response.ok){

    //             alert(data.message);

    //             return;

    //         }

    //         localStorage.setItem(

    //             "loggedInUser",

    //             JSON.stringify(data.user)

    //         );

    //         alert("Profile Updated Successfully");

    //         loadProfile();

    //     }

    //     catch(error){

    //         console.log(error);

    //     }

    // }
    async function handleSubmit(e) {

    e.preventDefault();

    const loggedUser = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const formData = new FormData();

    formData.append("fullName", fullName);
    formData.append("phone", phone);
    formData.append("address", address);

    if (newPhoto) {

        formData.append(
            "profilePhoto",
            newPhoto
        );

    }

    try {

        const response = await fetch(

        `https://complaint-management-backend-xocq.onrender.com/users/profile/${loggedUser._id}`,

            {

                method: "PUT",

                body: formData

            }

        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        localStorage.setItem(

            "loggedInUser",

            JSON.stringify(data.user)

        );

        setProfilePhoto(data.user.profilePhoto);
        setNewPhoto(null);

        alert("Profile Updated Successfully");

        loadProfile();

    }

    catch (error) {

        console.log(error);

        alert("Something went wrong.");

    }

}

    return(

        <Layout>

            <section className="complaint-card">

                <div className="heading">

                    <h1>

                        My Profile

                    </h1>

                    <p>

                        View and update your personal information.

                    </p>

                </div>

                <form onSubmit={handleSubmit}>                    <div
                        style={{
                            display:"flex",
                            justifyContent:"center",
                            marginBottom:"30px"
                        }}
                    >

                        <img

                           src={`https://complaint-management-backend-xocq.onrender.com/uploads/${profilePhoto}`}

                            alt=""

                            style={{
                                width:"140px",
                                height:"140px",
                                borderRadius:"50%",
                                objectFit:"cover",
                                border:"4px solid #2563eb"
                            }}

                        />

                    </div>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>

                                Full Name

                            </label>

                            <input

                                type="text"

                                value={fullName}

                                onChange={(e)=>

                                    setFullName(e.target.value)

                                }

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Email Address

                            </label>

                            <input

                                type="email"

                                value={email}

                                readOnly

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Phone Number

                            </label>

                            <input

                                type="text"

                                value={phone}

                                onChange={(e)=>

                                    setPhone(e.target.value)

                                }

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Address

                            </label>

                            <input

                                type="text"

                                value={address}

                                onChange={(e)=>

                                    setAddress(e.target.value)

                                }

                            />

                        </div>

                    </div>

                    <div className="form-group full">

                        <label>

                            Change Profile Photo

                        </label>

                        <input

                            type="file"

                            accept="image/*"

                            onChange={(e)=>

                                setNewPhoto(e.target.files[0])

                            }

                        />

                    </div>

                    <div className="buttons">

                        <button

                            type="submit"

                            className="submit-btn"

                        >

                            Save Changes

                        </button>

                    </div>

                </form>

            </section>

        </Layout>

    );

}

export default Profile;
