import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/predict", label: "Predict" },
  { to: "/about", label: "About" },
  { to: "/feedback", label: "Feedback" },
];

const Navbar = () => (
  <nav className="global-navbar">
    <NavLink to="/home" className="brand" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <img src="/image copy.png" alt="Cardio360" className="navbar-logo" style={{ height: "2rem", width: "auto" }} />
      Cardio360
    </NavLink>
    <ul className="nav-links">
      {navLinks.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link--active" : ""}`
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
    <span className="nav-end" aria-hidden="true">
      &nbsp;
    </span>
  </nav>
);

export default Navbar;
