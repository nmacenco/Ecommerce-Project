import React from "react";
import searchIcon from "../../icons/search-symbol.png";
import cartIcon from "../../icons/cart-icon.png";
import { SearchIcon, CartIcon } from "./NavStyles";
import { NavLink } from "react-router-dom";
import AdminDropdown from "./adminDropdown/AdminDropdown";
import { Link } from "react-router-dom";

const Nav = (): JSX.Element => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary d-flex">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          PC-SHOP
        </Link>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
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
          <button className="nav-item btn btn-secondary my-sm-3" type="submit">
            LOG IN
          </button>
          <AdminDropdown />
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
      </div>
    </nav>
  );
};

export default Nav;
