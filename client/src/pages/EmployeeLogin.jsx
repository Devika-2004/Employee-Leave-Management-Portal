import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

function EmployeeLogin() {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
    const handleLogin = (e) => {
    e.preventDefault();

  console.log("Email:", email);
  console.log("Password:", password);
};
  return (
    <>
  <Navbar />
  

    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center text-primary mb-4">
              Employee Login
            </h2>

            <form onSubmit={handleLogin}>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

            <button
            type="submit"
            className="btn btn-primary w-100">
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

export default EmployeeLogin;