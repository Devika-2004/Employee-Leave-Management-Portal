import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Sidebar({ role }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();

    toast.info("Logged Out Successfully");

    if (role === "HR") {
      navigate("/hr-login");
    } else {
      navigate("/login");
    }
  };

  const activeStyle = (path) => ({
    backgroundColor:
      location.pathname === path ? "#0d6efd" : "transparent",
    color: "#fff",
    borderRadius: "8px",
    padding: "10px 15px",
    marginBottom: "8px",
    transition: "0.3s",
  });

  return (
    <div
      className="bg-dark text-white shadow-lg d-flex flex-column"
      style={{
        width: "260px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {/* Logo */}
      <div className="text-center py-4 border-bottom">
        <h3 className="fw-bold text-info">
          AB Infotech
        </h3>

        <small className="text-light">
          Leave Management
        </small>
      </div>

      {/* Menu */}
      <div className="p-3 flex-grow-1">

        {role === "HR" ? (
          <>
            <p className="text-secondary fw-bold">
              HR PANEL
            </p>

            <Link
              to="/hr-dashboard"
              className="nav-link text-white"
              style={activeStyle("/hr-dashboard")}
            >
              📊 Dashboard
            </Link>
          </>
        ) : (
          <>
            <p className="text-secondary fw-bold">
              EMPLOYEE PANEL
            </p>

            <Link
              to="/employee-dashboard"
              className="nav-link text-white"
              style={activeStyle("/employee-dashboard")}
            >
              🏠 Dashboard
            </Link>

            <Link
              to="/apply-leave"
              className="nav-link text-white"
              style={activeStyle("/apply-leave")}
            >
              📝 Apply Leave
            </Link>

            <Link
              to="/my-leaves"
              className="nav-link text-white"
              style={activeStyle("/my-leaves")}
            >
              📅 My Leaves
            </Link>
          </>
        )}

      </div>

      {/* Logout */}
      <div className="p-3 border-top">
        <button
          className="btn btn-danger w-100"
          onClick={logout}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;