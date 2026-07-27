import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          AB Infotech
        </Link>

        <div>

          <Link to="/" className="btn btn-light btn-sm me-2">
            Home
          </Link>

          <Link to="/login" className="btn btn-outline-light btn-sm me-2">
            Employee Login
          </Link>

          <Link to="/hr-login" className="btn btn-outline-light btn-sm me-2">
            HR Login
          </Link>

          <Link to="/register" className="btn btn-warning btn-sm">
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;