import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {
  return (
    <>
  <Navbar />

    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow p-4">

            <h2 className="text-center text-success mb-4">
              Employee Registration
            </h2>

            <form>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter department"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                />
              </div>

              <button className="btn btn-success w-100">
                Register
              </button>

            </form>

            <div className="text-center mt-3">
              <Link to="/login">
                Already have an account? Login
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div></>
  );
}

export default Register;