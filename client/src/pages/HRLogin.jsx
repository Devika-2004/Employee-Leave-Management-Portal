import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function HRLogin() {
  return (
    <>
  <Navbar />
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center text-primary mb-4">
              HR Login
            </h2>

            <form>

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
                  placeholder="Enter your password"
                />
              </div>

             <button className="btn btn-dark w-100">
  Login
</button>

            </form>

            <div className="text-center mt-3">

              <Link to="/">
                Back to Home
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div></>
  );
}

export default HRLogin;