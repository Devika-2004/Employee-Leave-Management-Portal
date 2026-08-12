import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import Papa from "papaparse";

import {
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function HRDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const [employeeCount, setEmployeeCount] = useState(0);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch Leave Requests and Employee Count
  const fetchLeaves = useCallback(async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Get All Leave Requests
      const response = await axios.get(
        "http://localhost:5000/api/leaves",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      setLeaves(data);

      // Calculate Leave Statistics
      setStats({
        total: data.length,

        pending: data.filter(
          (leave) => leave.status === "Pending"
        ).length,

        approved: data.filter(
          (leave) => leave.status === "Approved"
        ).length,

        rejected: data.filter(
          (leave) => leave.status === "Rejected"
        ).length,
      });

      // Get Total Employees
      const employeeResponse = await axios.get(
        "http://localhost:5000/api/auth/count",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployeeCount(
        employeeResponse.data.totalEmployees
      );

    } catch (error) {
      console.log(
        error.response?.data?.message ||
        error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Unable to load dashboard data"
      );

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  // Search and Status Filter
  const filteredLeaves = leaves.filter((leave) => {
    const employeeName =
      leave.employeeId?.name || "";

    const matchesSearch = employeeName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : leave.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/leaves/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(`Leave ${status} Successfully`);

    fetchLeaves();

  } catch (error) {

    console.log(
      error.response?.data?.message ||
      error.message
    );

    toast.error(
      error.response?.data?.message ||
      "Something went wrong!"
    );
  }
};


// =========================
// Export CSV
// =========================

const exportCSV = () => {

  const csvData = filteredLeaves.map((leave) => ({
    Employee: leave.employeeId?.name || "N/A",

    Email: leave.employeeId?.email || "N/A",

    Department:
      leave.employeeId?.department || "N/A",

    LeaveType: leave.leaveType,

    StartDate: new Date(
      leave.startDate
    ).toLocaleDateString(),

    EndDate: new Date(
      leave.endDate
    ).toLocaleDateString(),

    Reason: leave.reason,

    Status: leave.status,
  }));

  const csv = Papa.unparse(csvData);

  const blob = new Blob(
    [csv],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);

  link.download = `Leave_Report_${
    new Date()
      .toISOString()
      .split("T")[0]
  }.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(link.href);

  toast.success(
    "Leave Report Exported Successfully"
  );
};


return (
  <div className="d-flex">

    <Sidebar role="HR" />

    <div
      className="flex-grow-1 bg-light"
      style={{
        marginLeft: "260px",
        minHeight: "100vh",
        padding: "35px",
      }}
    >

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold text-dark mb-1">
            Welcome, HR Admin 👋
          </h2>

          <p className="text-muted mb-0">
            Manage employee leave requests efficiently.
          </p>

        </div>

        <div className="text-end">

          <span className="badge bg-primary fs-6 px-3 py-2">
            Total Requests : {stats.total}
          </span>

        </div>

      </div>

    {/* Statistics Cards */}

<div className="row g-4">

  {/* Total Employees */}
  <div className="col-xl-3 col-md-6">

    <div
      className="card border-0 shadow-sm h-100"
      style={{
        borderLeft: "5px solid #0d6efd",
        borderRadius: "12px",
      }}
    >

      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-center">

          <div>

            <p className="text-muted mb-2 fw-semibold">
              Total Employees
            </p>

            <h2 className="fw-bold mb-0">
              {employeeCount}
            </h2>

            <small className="text-muted">
              Active employees
            </small>

          </div>

          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "12px",
              backgroundColor: "#e7f1ff",
              color: "#0d6efd",
              fontSize: "24px",
            }}
          >
            <FaUsers />
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
        borderLeft: "5px solid #ffc107",
        borderRadius: "12px",
      }}
    >

      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-center">

          <div>

            <p className="text-muted mb-2 fw-semibold">
              Pending Leaves
            </p>

            <h2 className="fw-bold mb-0">
              {stats.pending}
            </h2>

            <small className="text-muted">
              Awaiting approval
            </small>

          </div>

          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "12px",
              backgroundColor: "#fff8e1",
              color: "#d99a00",
              fontSize: "24px",
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
        borderLeft: "5px solid #198754",
        borderRadius: "12px",
      }}
    >

      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-center">

          <div>

            <p className="text-muted mb-2 fw-semibold">
              Approved Leaves
            </p>

            <h2 className="fw-bold mb-0">
              {stats.approved}
            </h2>

            <small className="text-muted">
              Approved requests
            </small>

          </div>

          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "12px",
              backgroundColor: "#e8f5e9",
              color: "#198754",
              fontSize: "24px",
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
        borderLeft: "5px solid #dc3545",
        borderRadius: "12px",
      }}
    >

      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-center">

          <div>

            <p className="text-muted mb-2 fw-semibold">
              Rejected Leaves
            </p>

            <h2 className="fw-bold mb-0">
              {stats.rejected}
            </h2>

            <small className="text-muted">
              Rejected requests
            </small>

          </div>

          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "12px",
              backgroundColor: "#fdecec",
              color: "#dc3545",
              fontSize: "24px",
            }}
          >
            <FaTimesCircle />
          </div>

        </div>

      </div>

    </div>

  </div>

</div>

{/* Leave Requests */}

<div className="card shadow border-0 mt-5">

  <div className="card-header bg-white d-flex justify-content-between align-items-center">

    <div className="d-flex align-items-center">

      <h4 className="fw-bold mb-0">
        Leave Requests
      </h4>

      <button
        className="btn btn-success ms-3"
        onClick={exportCSV}
      >
        📄 Export CSV
      </button>

    </div>

    <span className="badge bg-dark fs-6">
      {filteredLeaves.length} Records
    </span>

  </div>
    {/* Search + Filter */}

<div className="card-body border-bottom">

  <div className="row g-3">

    {/* Search Employee */}

    <div className="col-md-8">

      <input
        type="text"
        className="form-control"
        placeholder="Search employee by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>


    {/* Status Filter */}

    <div className="col-md-4">

      <select
        className="form-select"
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(e.target.value)
        }
      >

        <option value="All">
          All Status
        </option>

        <option value="Pending">
          Pending
        </option>

        <option value="Approved">
          Approved
        </option>

        <option value="Rejected">
          Rejected
        </option>

      </select>

    </div>

  </div>

</div>


{/* Leave Requests Table */}

<div className="card-body">

  {loading ? (

    <div className="text-center py-5">

      <div
        className="spinner-border text-primary"
        role="status"
      >
        <span className="visually-hidden">
          Loading...
        </span>
      </div>

      <p className="mt-3 text-muted">
        Loading Leave Requests...
      </p>

    </div>

  ) : (

    <div className="table-responsive">

      <table className="table table-hover align-middle">

        <thead className="table-light">

          <tr>

            <th>Employee</th>

            <th>Leave Type</th>

            <th>Start Date</th>

            <th>End Date</th>

            <th>Reason</th>

            <th>Status</th>

            <th className="text-center">
              Action
            </th>

          </tr>

        </thead>


        <tbody>

          {filteredLeaves.length > 0 ? (

            filteredLeaves.map((leave) => (

              <tr key={leave._id}>

                <td>
                  <span className="fw-semibold">
                    {leave.employeeId?.name || "N/A"}
                  </span>
                </td>


                <td>
                  {leave.leaveType}
                </td>


                <td>
                  {new Date(
                    leave.startDate
                  ).toLocaleDateString()}
                </td>


                <td>
                  {new Date(
                    leave.endDate
                  ).toLocaleDateString()}
                </td>


                <td>
                  {leave.reason}
                </td>


                <td>

                  {leave.status === "Pending" && (

                    <span className="badge bg-warning text-dark">
                      Pending
                    </span>

                  )}

                  {leave.status === "Approved" && (

                    <span className="badge bg-success">
                      Approved
                    </span>

                  )}

                  {leave.status === "Rejected" && (

                    <span className="badge bg-danger">
                      Rejected
                    </span>

                  )}

                </td>

        <td className="text-center">

  {leave.status === "Pending" ? (

    <>
      <button
        className="btn btn-success btn-sm me-2"
        onClick={() =>
          updateStatus(
            leave._id,
            "Approved"
          )
        }
      >
        Approve
      </button>

      <button
        className="btn btn-danger btn-sm"
        onClick={() =>
          updateStatus(
            leave._id,
            "Rejected"
          )
        }
      >
        Reject
      </button>
    </>

  ) : (

    <span className="text-muted">
      Completed
    </span>

  )}

</td>


</tr>

))

) : (

<tr>

  <td
    colSpan="7"
    className="text-center py-4 text-muted"
  >
    No Leave Requests Found
  </td>

</tr>

)}

</tbody>

</table>

</div>

)}

</div>

</div>

</div>

</div>

);

}

export default HRDashboard;