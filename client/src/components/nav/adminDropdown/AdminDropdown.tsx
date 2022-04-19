import React from "react";
import { DropdownMenu } from "./AdminDropdownStyle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../../redux/actions/user";
import { State } from "../../../redux/reducers";
import { getOrdersAdmin } from "../../../redux/actions/ordersAdmin";
import { clearCart } from "../../../redux/actions/cart";
import swal from "sweetalert";

const AdminDropdown = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state: State) => state.user);

  const logout = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    dispatch(LogoutUser());
    localStorage.removeItem('cart')
    dispatch(clearCart())
    navigate("/products");
    swal({
      title: "Logged out.",
    });
  };

  const getOrders = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    setTimeout(()=> {
      navigate("/ordersAdmin");

    } , 200 )
  };

  return (
    <ul className="nav-item dropdown navbar-nav">
      <a
        className="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {userState && userState.name}
      </a>
      <DropdownMenu className="dropdown-menu">
        <Link className="dropdown-item" to="/createProduct">
          Create product
        </Link>
        <Link className="dropdown-item" to="/createCategory">
          Create category
        </Link>
        <Link className="dropdown-item" to="/deleteCategory">
          Delete category
        </Link>
        <Link onClick={getOrders} to={""} className="dropdown-item">
          Admin orders
        </Link>
        <Link to={"/productsAdminMode"} className="dropdown-item">
          Admin products
        </Link>
        <Link to={"/usersAdminMode"} className="dropdown-item">
          Admin users
        </Link>
        <div className="dropdown-divider"></div>
        <a onClick={logout} className="dropdown-item" href="#">
          Log out
        </a>
      </DropdownMenu>
    </ul>
  );
};

export default AdminDropdown;


