import React from "react";
import logo from "../../img/logo.png";
import profile from "../../img/profile-img.jpg";
import { Link } from "react-router-dom";

const Header = ({ toggleSidebar, setToggleSidebar }) => {
  const handleToogleSidebar = () => {
    if (toggleSidebar) {
      setToggleSidebar(false);
    } else {
      setToggleSidebar(true);
    }
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/Dashboard" className="logo d-flex align-items-center">
          <img src={logo} alt="logo" />
          <span className="d-none d-lg-block">POWER CRM</span>
        </Link>
        <i
          className="bi bi-list toggle-sidebar-btn"
          onClick={handleToogleSidebar}
        ></i>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <Link
              className="nav-link nav-profile d-flex align-items-center pe-0"
              data-bs-toggle="dropdown"
            >
              <img src={profile} alt="Profile" className="rounded-circle" />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                Admin
              </span>
            </Link>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>Admin</h6>
                <span>POWER CRM CEO</span>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/Profile"
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/FAQS"
                >
                  <i className="bi bi-question-circle"></i>
                  <span>Need Help ?</span>
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
