import React from "react";
import cartIcon from "../../icons/cart-icon.png";
import {  CartIcon } from "./NavStyles";
import { Link } from 'react-router-dom';
import AdminDropdown from "./adminDropdown/AdminDropdown";
import Search from "../SearchBar/Search";
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
                <a className="nav-link" href="/products">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
            </ul>
            <Search/>
            <Link to='/login' className="nav-item btn btn-secondary my-sm-3 link-Router" >
              Login
            </Link>
            <Link to='/register' className="nav-item btn btn-secondary my-sm-3 link-Router" >
              Register
            </Link>
          </div>
        </div>


          <div className="ms-auto">
            <a className="nav-item" href="/cart">
              <CartIcon src={cartIcon} />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarColor01"
              aria-controls="navbarColor01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            />
            <span className="navbar-toggler-icon"></span>

            <AdminDropdown />
          </div>
      </nav>
    </div>
  );
}

export default Nav;