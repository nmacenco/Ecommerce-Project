import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../SearchBar/Search";
import AdminDropdown from "./adminDropdown/AdminDropdown";
import { Routes, Link, Route } from "react-router-dom";
import { resetFilterProducts } from "../../redux/actions/filterByCategory";
import { State } from "../../redux/reducers";
import { LogoutUser } from "../../redux/actions/user";
import {
  getProducts,
  productNotFound,
  resetPoducts,
} from "../../redux/actions/products";
import { deleteProductDetail } from "../../redux/actions/productDetail";
import { Product } from "../../redux/interface";
import UserDropdown from "./userDropdown/UserDropdown";
import CartIcon from "./cartIcon/CartIcon";

const Nav = (): JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);
  const productsCart = useSelector((state: State) => state.cart.cart);

  const logout = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    dispatch(LogoutUser());
  };

  function handleClickProducts() {
    dispatch(productNotFound(false));
    dispatch(resetFilterProducts());
    dispatch(resetPoducts());
    // dispatch(resetPoducts())
    dispatch(deleteProductDetail());
    dispatch(getProducts());
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top p-3">
      <div className="flex-grow-1 d-lg-flex">
        <Link className="navbar-brand pt-3" to="/home">
          PCSHOP
        </Link>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <div className="navbar-nav me-auto">
            <div className="nav-item">
              <Link
                onClick={() => {
                  handleClickProducts();
                }}
                className="nav-link"
                to={"/products"}
              >
                Products
              </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to={"/products"}>
                About
              </Link>
            </div>
          </div>
          <Routes>
            <Route path="/products" element={<Search />} />
            <Route path="/adminMode" element={<Search />} />
          </Routes>

          {/* Dependiendo de que TIPO de usuario sea: */}
          <AdminDropdown />
          {/* <UserDropdown />	 */}

          {/* Una vez iniciada la sesion este boton no deberia aparecer */}
          {!user && (
            <Link
              to="/login"
              className="nav-item btn btn-secondary my-2 link-Router"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="ms-auto mb-auto py-lg-3">
        <Routes>
          <Route path="/products" element={<CartIcon />} />
          <Route path="/cart" element={<CartIcon />} />
          <Route path="/detail/:id" element={<CartIcon />} />
        </Routes>
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
