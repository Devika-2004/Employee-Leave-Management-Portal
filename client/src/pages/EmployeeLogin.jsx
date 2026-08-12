import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EmployeeLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "employee",
        JSON.stringify(response.data.employee)
      );

      toast.success("Login Successful");

      navigate("/employee-dashboard");

    } catch (error) {

      console.log(
        error.response?.data?.message ||
        error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Invalid Email or Password"
      );
    }
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
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
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
      </div>
    </>
  );
}

export default EmployeeLogin;