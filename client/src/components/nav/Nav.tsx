import React from "react";
import cartIcon from "../../icons/cart-icon.png";
import { useDispatch, useSelector } from "react-redux";
import Search from "../SearchBar/Search";
import { SearchIcon, CartIcon } from "./NavStyles";
import AdminDropdown from "./adminDropdown/AdminDropdown";
import { Link } from "react-router-dom";
import { resetFilterProducts } from '../../redux/actions/filterByCategory';
import { State } from "../../redux/reducers";
import { LogoutUser } from "../../redux/actions/user";
import { getProducts, productNotFound, resetPoducts } from "../../redux/actions/products";
import { deleteProductDetail } from "../../redux/actions/productDetail";


const Nav = (): JSX.Element => {
  const dispatch = useDispatch();
  const user=useSelector((state:State)=>state.user);

  const logout=(event:React.MouseEvent<HTMLSpanElement>)=>{
    event.preventDefault();
    dispatch(LogoutUser());

  }

  function handleClickProducts () {
    dispatch(productNotFound(false))
    dispatch(resetFilterProducts())
    dispatch(resetPoducts())
    dispatch(deleteProductDetail());
    dispatch(getProducts())

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top p-3">
      <div className="flex-grow-1 d-lg-flex">
        <Link className="navbar-brand pt-3" to="/home">
          ECOMMERCE
        </Link>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <div className="navbar-nav me-auto">
            <div className="nav-item">
              <Link onClick={() => {handleClickProducts()}} className="nav-link" to={"/products"}>
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
          {
            user ?
              <span className="nav-item btn btn-secondary my-2 link-Router" onClick={logout}>
                  Logout
                </span>
                :
                <Link
                  to="/login"
                className="nav-item btn btn-secondary my-2 link-Router"
                >
                  Login
                </Link>
          }
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
