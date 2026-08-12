import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import {
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaPen,
  FaCalendarAlt,
} from "react-icons/fa";

function EmployeeDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const employee = JSON.parse(
    localStorage.getItem("employee")
  );

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/leaves/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const leaves = response.data;

      setStats({
        total: leaves.length,

        pending: leaves.filter(
          (leave) => leave.status === "Pending"
        ).length,

        approved: leaves.filter(
          (leave) => leave.status === "Approved"
        ).length,

        rejected: leaves.filter(
          (leave) => leave.status === "Rejected"
        ).length,
      });
    } catch (error) {
      console.log(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div className="d-flex">

      {/* Sidebar */}
      <Sidebar role="Employee" />

      {/* Main Content */}
      <div
        className="flex-grow-1 bg-light"
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
          padding: "35px",
        }}
      >

        {/* Header */}
        <div className="mb-4">

          <h2 className="fw-bold text-dark mb-1">
            Welcome, {employee?.name || "Employee"} 👋
          </h2>

          <p className="text-muted mb-0">
            Manage your leave requests from here
          </p>

        </div>

        {/* Dashboard Cards */}
        <div className="row g-4">

          {/* Total Leaves */}
          <div className="col-xl-3 col-md-6">

            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "14px",
              }}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start">

                  <div>

                    <h6 className="text-muted mb-3">
                      Total Leaves
                    </h6>

                    <h2 className="fw-bold text-dark mb-2">
                      {stats.total}
                    </h2>

                    <p className="text-muted mb-0 small">
                      All leave requests
                    </p>

                  </div>

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      backgroundColor: "#e8f1ff",
                      color: "#0d6efd",
                      fontSize: "25px",
                    }}
                  >
                    <FaFileAlt />
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Pending Leaves */}
          <div className="col-xl-3 col-md-6">

            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "14px",
              }}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start">

                  <div>

                    <h6 className="text-muted mb-3">
                      Pending Leaves
                    </h6>

                    <h2 className="fw-bold text-dark mb-2">
                      {stats.pending}
                    </h2>

                    <p className="text-muted mb-0 small">
                      Awaiting approval
                    </p>

                  </div>

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      backgroundColor: "#fff4d6",
                      color: "#e0a000",
                      fontSize: "25px",
                    }}
                  >
                    <FaClock />
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Approved Leaves */}
          <div className="col-xl-3 col-md-6">

            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "14px",
              }}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start">

                  <div>

                    <h6 className="text-muted mb-3">
                      Approved Leaves
                    </h6>

                    <h2 className="fw-bold text-dark mb-2">
                      {stats.approved}
                    </h2>

                    <p className="text-muted mb-0 small">
                      Approved requests
                    </p>

                  </div>

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      backgroundColor: "#e4f5eb",
                      color: "#198754",
                      fontSize: "25px",
                    }}
                  >
                    <FaCheckCircle />
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Rejected Leaves */}
          <div className="col-xl-3 col-md-6">

            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "14px",
              }}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start">

                  <div>

                    <h6 className="text-muted mb-3">
                      Rejected Leaves
                    </h6>

                    <h2 className="fw-bold text-dark mb-2">
                      {stats.rejected}
                    </h2>

                    <p className="text-muted mb-0 small">
                      Rejected requests
                    </p>

                  </div>

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      backgroundColor: "#fde8e8",
                      color: "#dc3545",
                      fontSize: "25px",
                    }}
                  >
                    <FaTimesCircle />
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Quick Actions */}
        <div
          className="card shadow border-0 mt-5 p-4"
          style={{
            borderRadius: "14px",
          }}
        >

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h4 className="fw-bold mb-0">
              Quick Actions
            </h4>

            <small className="text-muted">
              Choose an option
            </small>

          </div>


          <div className="row g-4">

            {/* Apply Leave */}
            <div className="col-md-6">

              <Link
                to="/apply-leave"
                className="text-decoration-none"
              >

                <div
                  className="card border-0 shadow-sm h-100 text-center p-4"
                  style={{
                    borderRadius: "12px",
                    transition: "0.2s",
                  }}
                >

                  <div
                    className="mx-auto mb-3 rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                    style={{
                      width: "65px",
                      height: "65px",
                      fontSize: "27px",
                    }}
                  >
                    <FaPen />
                  </div>

                  <h5 className="fw-bold text-dark">
                    Apply Leave
                  </h5>

                  <p className="text-muted mb-0">
                    Submit a new leave request.
                  </p>

                </div>

              </Link>

            </div>


            {/* My Leaves */}
            <div className="col-md-6">

              <Link
                to="/my-leaves"
                className="text-decoration-none"
              >

                <div
                  className="card border-0 shadow-sm h-100 text-center p-4"
                  style={{
                    borderRadius: "12px",
                    transition: "0.2s",
                  }}
                >

                  <div
                    className="mx-auto mb-3 rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
                    style={{
                      width: "65px",
                      height: "65px",
                      fontSize: "27px",
                    }}
                  >
                    <FaCalendarAlt />
                  </div>

                  <h5 className="fw-bold text-dark">
                    My Leaves
                  </h5>

                  <p className="text-muted mb-0">
                    View your leave history and status.
                  </p>

                </div>

              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EmployeeDashboard;