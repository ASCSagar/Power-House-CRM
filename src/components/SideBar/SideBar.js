import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link " href="index.html">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#components-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>Company</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="components-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="components-accordion.html">
                  <i className="bi bi-circle"></i>
                  <span>View Company</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#forms-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-journal-text"></i>
              <span>Site</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="forms-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="forms-layouts.html">
                  <i className="bi bi-circle"></i>
                  <span>View Site</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#tables-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-layout-text-window-reverse"></i>
              <span>Quote</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="tables-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="tables-data.html">
                  <i className="bi bi-circle"></i>
                  <span>View Quote</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#charts-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-bar-chart"></i>
              <span>Note</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="charts-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="charts-apexcharts.html">
                  <i className="bi bi-circle"></i>
                  <span>View Note</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/Contact">
              <i className="bi bi-envelope"></i>
              <span>Contact</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/">
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Login</span>
            </Link>
          </li>

        </ul>
      </aside>
  );
};

export default SideBar;