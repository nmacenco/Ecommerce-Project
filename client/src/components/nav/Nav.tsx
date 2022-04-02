import React from "react";
import cartIcon from "../../icons/cart-icon.png";

import Search from "../SearchBar/Search";
import { SearchIcon, CartIcon } from "./NavStyles";
import AdminDropdown from "./adminDropdown/AdminDropdown";
import { Link } from "react-router-dom";

const Nav = (): JSX.Element => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary d-flex fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          ECOMMERCE
        </a>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to={"/products"}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/products"}>
                About
              </Link>
            </li>
          </ul>
          <Search />
          <Link
            to="/login"
            className="nav-item btn btn-secondary my-sm-3 link-Router"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="nav-item btn btn-secondary my-sm-3 link-Router"
          >
            Register
          </Link>
          <AdminDropdown />
        </div>
      </div>

      <div className="ms-auto">
        <Link className="nav-item" to={"/cart"}>

          <CartIcon src={cartIcon} />

        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
