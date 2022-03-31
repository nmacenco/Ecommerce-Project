import React from "react";
import { DropdownMenu } from "./AdminDropdownStyle";

const AdminDropdown = () => {
  return (
    <ul className="nav-item dropdown navbar-nav">
      <a
        className="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        href="#"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {/* Aca deberia ir el nombre del usuario */}
        Admin
      </a>
      <DropdownMenu className="dropdown-menu">
        <a className="dropdown-item" href="#">
          Create product
        </a>
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
