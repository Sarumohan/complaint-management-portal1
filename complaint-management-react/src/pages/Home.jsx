import { Link } from "react-router-dom";
import "../styles/home.css";


function Home() {
  return (
    <>
      <section className="section1">

        <nav>

          <div className="logo">

            <img src="/icon.png" className="icon" alt="Logo" />

            <h2>Complaint Portal</h2>

          </div>

          <ul>

            <li><a href="#">Home</a></li>

            <li><a href="#">About</a></li>

            <li><a href="#">Services</a></li>

            <li><a href="#">Track Complaint</a></li>

            <li><a href="#">Contact</a></li>

          </ul>

          <div className="nav-buttons">

            <Link to="/login" className="login">
              Login
            </Link>

            <Link to="/register" className="register">
              Register
            </Link>

          </div>

        </nav>

        <div className="content">

          <h1>
            Your Voice <span>Matters</span>
          </h1>

          <p>
            Submit complaints easily, track their progress in real time,
            and receive transparent resolutions through our
            Complaint Management Portal.
          </p>

          <div className="content-buttons">

            <Link to="/login" className="primary-btn">
              Register Complaint
            </Link>

            <Link to="/login" className="secondary-btn">
              Track Complaint
            </Link>

          </div>

        </div>

        <div className="blur-card">

          <div className="stat">
            <h3>25K+</h3>
            <p>Complaints</p>
          </div>

          <div className="stat">
            <h3>18K+</h3>
            <p>Resolved</p>
          </div>

          <div className="stat">
            <h3>35+</h3>
            <p>Departments</p>
          </div>

          <div className="stat">
            <h3>24/7</h3>
            <p>Support</p>
          </div>

        </div>

      </section>

      <section className="why-us">

        <h2>Why Choose Our Portal?</h2>

        <p>
          Our Complaint Management Portal simplifies complaint registration,
          improves transparency, and ensures faster issue resolution.
        </p>

        <div className="features">

          <div className="feature-grid">
            <h3>Easy Complaint Submission</h3>
            <p>Register complaints online within minutes.</p>
          </div>

          <div className="feature-grid">
            <h3>Real-Time Tracking</h3>
            <p>Track complaint progress anytime.</p>
          </div>

          <div className="feature-grid">
            <h3>Department Routing</h3>
            <p>
              Complaints are routed automatically to the correct department.
            </p>
          </div>

          <div className="feature-grid">
            <h3>Analytics</h3>
            <p>Gain insights through complaint reports and dashboards.</p>
          </div>

        </div>

      </section>

      <section className="how-it-works">

        <h2>How It Works</h2>

        <div className="steps">

          <div className="step">
            <span>1</span>
            <h3>Register</h3>
            <p>Create your account.</p>
          </div>

          <div className="step">
            <span>2</span>
            <h3>Submit</h3>
            <p>Register your complaint.</p>
          </div>

          <div className="step">
            <span>3</span>
            <h3>Track</h3>
            <p>Monitor complaint progress.</p>
          </div>

          <div className="step">
            <span>4</span>
            <h3>Resolved</h3>
            <p>Receive updates and provide feedback.</p>
          </div>

        </div>

      </section>

      <footer>

        <h2>Complaint Management Portal</h2>

        <p>
          Making complaint registration transparent,
          efficient and user friendly.
        </p>

        <p>
          © 2026 Complaint Management Portal | All Rights Reserved.
        </p>

      </footer>
    </>
  );
}

export default Home;