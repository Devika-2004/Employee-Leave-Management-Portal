import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ApplyLeave() {
  const navigate = useNavigate();

  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/leaves/apply",
        {
          leaveType,
          startDate,
          endDate,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      navigate("/employee-dashboard");

    } catch (error) {

      console.log(
        error.response?.data?.message ||
        error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow p-4">

            <h2 className="text-center text-primary mb-4">
              Apply Leave
            </h2>

            <form onSubmit={handleSubmit}>

              {/* Leave Type */}

              <div className="mb-3">

                <label className="form-label">
                  Leave Type
                </label>

                <select
                  className="form-select"
                  value={leaveType}
                  onChange={(e) =>
                    setLeaveType(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Select Leave Type
                  </option>

                  <option value="Sick">
                    Sick Leave
                  </option>

                  <option value="Casual">
                    Casual Leave
                  </option>

                  <option value="Earned">
                    Earned Leave
                  </option>

                </select>

              </div>

              {/* Start Date */}

              <div className="mb-3">

                <label className="form-label">
                  Start Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                  required
                />

              </div>

              {/* End Date */}

              <div className="mb-3">

                <label className="form-label">
                  End Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(e.target.value)
                  }
                  required
                />

              </div>

              {/* Reason */}

              <div className="mb-3">

                <label className="form-label">
                  Reason
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter Leave Reason"
                  value={reason}
                  onChange={(e) =>
                    setReason(e.target.value)
                  }
                  required
                ></textarea>

              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Apply Leave
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ApplyLeave;