import { useEffect, useState } from "react";
import axios from "axios";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
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

      setLeaves(response.data);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center text-primary mb-4">
        My Leaves
      </h2>

      <table className="table table-bordered table-hover shadow">

        <thead className="table-dark">
          <tr>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {leaves.length > 0 ? (
            leaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.leaveType}</td>

                <td>
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>

                <td>
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>

                <td>{leave.reason}</td>

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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Leave Requests Found
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}

export default MyLeaves;