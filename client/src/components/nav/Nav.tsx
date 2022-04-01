import React from "react";
import searchIcon from "../../icons/search-symbol.png";
import cartIcon from "../../icons/cart-icon.png";
import { SearchIcon, CartIcon } from "./NavStyles";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminDropdown from "./adminDropdown/AdminDropdown";

const Nav = (): JSX.Element => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary d-flex">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            ECOMMERCE
          </a>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to={"/products"}>
                  <a className="nav-link" href="">
                    Products
                  </a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/products"}>
                  <a className="nav-link" href="#">
                    About
                  </a>
                </NavLink>
              </li>
            </ul>
            <form className="nav-item d-flex">
              <input
                className="form-control my-2"
                type="text"
                placeholder="Search"
              ></input>
              <button className="btn btn-secondary my-2" type="submit">
                <SearchIcon src={searchIcon} />
              </button>
            </form>
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
          </div>
        </div>
        {/* {"tercer div"} */}
        <AdminDropdown />
        <div className="ms-auto">
          <NavLink className="nav-item" to={"/cart"}>
            <a className="nav-item" href="/cart">
              <CartIcon src={cartIcon} />
            </a>
          </NavLink>
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
    </div>
  );
};

export default Nav;
