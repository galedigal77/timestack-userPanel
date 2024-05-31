import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import logo from "/images/timestack-logo.png";

const Sidebar = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="#"
      >
        <div className="sidebar-brand-icon">
          <img src={logo} alt="Logo" className="sidebar-logo" />
        </div>
      </a>

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <Link className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Main</div>

      <li className="nav-item">
        <Link className="nav-link" to="/time-tracker">
          <i className="fas fa-fw fa-address-card"></i>
          <span>Time Tracker</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/timesheet">
          <i className="fas fa-fw fa-building"></i>
          <span>Timesheet</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/payslip">
          <i className="fas fa-fw fa-building"></i>
          <span>Payslip</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/leave">
          <i className="fas fa-fw fa-bullseye"></i>
          <span>Leave</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/goals">
          <i className="fas fa-fw fa-fingerprint"></i>
          <span>Goals</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/manage-shift">
          <i className="fas fa-fw fa-user-clock"></i>
          <span>Manage Shift</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/help">
          <i className="fas fa-fw fa-file"></i>
          <span>Help</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <li className="nav-item">
        <Link className="nav-link" to="/admin-access">
          <i className="fas fa-fw fa-home"></i>
          <span>Admin Access</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
};

export default Sidebar;
