function Topbar(){

    const user =
        JSON.parse(localStorage.getItem("loggedInUser"));

    return(

        <header className="topbar">

            <div className="search-box">

                <i className="fa-solid fa-magnifying-glass"></i>

                <input
                    type="text"
                    placeholder="Search complaints..."
                />

            </div>

            <div className="top-right">

                <div className="notification">

                    <i className="fa-regular fa-bell"></i>

                    <span>0</span>

                </div>

                <div className="profile">

                    <img
                        src="/profile.png"
                        alt="profile"
                    />

                    <span>

                        {
                            user
                            ? user.fullName
                            : "User"
                        }

                    </span>

                </div>

            </div>

        </header>

    );

}

export default Topbar;