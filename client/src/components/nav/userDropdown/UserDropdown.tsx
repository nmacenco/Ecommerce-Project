import React from "react";
import { DropdownMenu } from "./UserDropdownStyle";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux/reducers";
import { Link, useNavigate } from "react-router-dom";
import { LogoutUser } from "../../../redux/actions/user";
import { clearCart } from "../../../redux/actions/cart";

const UserDropdown = () => {
  const dispatch = useDispatch()
  const userState = useSelector((state: State) => state.user);
  const navigate = useNavigate()

  function handleClickProfile() {
    // dispatch(getSingleUser(userInStorage.token))
  }

  const logout = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    navigate('/products')
    dispatch(LogoutUser());
    dispatch(clearCart());
    localStorage.removeItem('cart')
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
        <Link onClick={() => { handleClickProfile() }} to={"/profile"} className="dropdown-item">
          Profile
        </Link>
        <Link to={"/ordersHistory"} className="dropdown-item">
          Orders History
        </Link>
        <Link to={"/wishList"} className="dropdown-item">
          WishList
        </Link>
        <div className="dropdown-divider"></div>
        <a onClick={logout} className="dropdown-item" href="#">
          Log out
        </a>
      </DropdownMenu>
    </ul>
  );
};

export default UserDropdown;
