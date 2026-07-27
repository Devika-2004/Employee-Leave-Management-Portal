import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import EmployeeLogin from "./pages/EmployeeLogin";
import HRLogin from "./pages/HRLogin";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<EmployeeLogin />} />
      <Route path="/hr-login" element={<HRLogin />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;