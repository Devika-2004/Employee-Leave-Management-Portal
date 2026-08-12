import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import EmployeeLogin from "./pages/EmployeeLogin";
import HRLogin from "./pages/HRLogin";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import MyLeaves from "./pages/MyLeaves";
import HRDashboard from "./pages/HRDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<EmployeeLogin />} />

      <Route path="/hr-login" element={<HRLogin />} />

      <Route path="/register" element={<Register />} />

      {/* Employee Protected Routes */}

      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute role="Employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/apply-leave"
        element={
          <ProtectedRoute role="Employee">
            <ApplyLeave />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-leaves"
        element={
          <ProtectedRoute role="Employee">
            <MyLeaves />
          </ProtectedRoute>
        }
      />

      {/* HR Protected Route */}

      <Route
        path="/hr-dashboard"
        element={
          <ProtectedRoute role="HR">
            <HRDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;