import "./Navbar.css";
import logo from "./img/logo-crm-grande.png";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div className="container">
        <Link className="navbar-brand" to={"/home"}>
          <img src={logo} alt="Logo viaja-tech" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fas fa-bars ms-1"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
            <li className="nav-item">
              <HashLink className="nav-link" to={"home#services"}>
                Serviços
              </HashLink>
            </li>
            <li className="nav-item">
              <li className="nav-item">
                <HashLink className="nav-link" to={"home#contact"}>
                  Contato
                </HashLink>
              </li>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/login"}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/register"}>
                Registre-se
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
