import React from "react";
import { DropdownMenu } from "./AdminDropdownStyle";
import { Link } from "react-router-dom";

const AdminDropdown = () => {
  return (
    <ul className="nav-item dropdown navbar-nav">
      <a
        className="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {/* Aca deberia ir el nombre del usuario */}
        Admin
      </a>
      <DropdownMenu className="dropdown-menu">
        <Link className="dropdown-item" to="/createProduct">
          Create product
        </Link>
        <a className="dropdown-item" href="#">
          Admin mode
        </a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#">
          Log out
        </a>
      </DropdownMenu>
    </ul>
  );
};

export default AdminDropdown;
