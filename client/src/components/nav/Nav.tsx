import React from "react";
import cartIcon from "../../icons/cart-icon.png";

import Search from "../SearchBar/Search";
import { SearchIcon, CartIcon } from "./NavStyles";
import AdminDropdown from "./adminDropdown/AdminDropdown";
import { Link } from "react-router-dom";

const Nav = (): JSX.Element => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top p-3">
      <div className="flex-grow-1 d-lg-flex">
        <Link className="navbar-brand pt-3" to="/home">
          ECOMMERCE
        </Link>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <div className="navbar-nav me-auto">
            <div className="nav-item">
              <Link className="nav-link" to={"/products"}>
                Products
              </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to={"/products"}>
                About
              </Link>
            </div>
          </div>
          <AdminDropdown />
          <Link
            to="/login"
            className="nav-item btn btn-secondary my-2 link-Router"
          >
            Login
          </Link>
          <Search />
        </div>
      </div>

      <div className="ms-auto mb-auto py-lg-3">
        <Link className="nav-item" to={"/cart"}>
          <CartIcon src={cartIcon} />
        </Link>
        <button
          className="navbar-toggler nav-item"
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
