import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const employee = JSON.parse(localStorage.getItem("employee"));

  // User not logged in
  if (!token || !employee) {
    return <Navigate to="/login" replace />;
  }

  // HR Route Protection
  if (role && employee.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;