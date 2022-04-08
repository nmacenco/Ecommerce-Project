import React from "react";
import { DropdownMenu } from "./UserDropdownStyle";
import { Link } from "react-router-dom";

const UserDropdown = () => {
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
        User
      </a>
      <DropdownMenu className="dropdown-menu">
        <Link to={"/ordersHistory"} className="dropdown-item">
          User config
        </Link>
        <Link to={"/ordersHistory"} className="dropdown-item">
          Orders History
        </Link>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#">
          Log out
        </a>
      </DropdownMenu>
    </ul>
  );
};

export default UserDropdown;
