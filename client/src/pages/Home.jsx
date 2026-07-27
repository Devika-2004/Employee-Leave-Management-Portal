import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="container text-center mt-5">

        <h1 className="fw-bold text-primary">
          AB Infotech Solutions Pvt. Ltd.
        </h1>

        <h3 className="mt-3">
          Employee Leave Management Portal
        </h3>

        <p className="text-muted mt-3">
          Manage employee leave requests efficiently and securely.
        </p>

        <div className="mt-4">
          <Link to="/login">
            <button className="btn btn-primary me-3">
              Employee Login
            </button>
          </Link>

          <Link to="/hr-login">
            <button className="btn btn-dark">
              HR Login
            </button>
          </Link>
        </div>

        <div className="mt-4">
          <p>Don't have an account?</p>

          <Link to="/register">
            <button className="btn btn-success">
              Register
            </button>
          </Link>
        </div>

      </div>
    </>
  );
}

export default Home;