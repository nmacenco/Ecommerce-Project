import React from "react";
import { DropdownMenu } from "./UserDropdownStyle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSingleUser, LogoutUser } from "../../../redux/actions/user";
import { useLocalStorage } from "../../../helpers/useLocalStorage";

const UserDropdown = () => {
  const dispatch = useDispatch()
  const [userInStorage, setuserInStorage] = useLocalStorage('USER_LOGGED', '')
  const navigate = useNavigate()
  function handleClickProfile () {
    // dispatch(getSingleUser(userInStorage.token))
  }

  const logout = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    navigate('/products')
    dispatch(LogoutUser());
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
        {/* Aca deberia ir el nombre del usuario */}
        User
      </a>
      <DropdownMenu className="dropdown-menu">
        <Link onClick={()=> {handleClickProfile()}} to={"/profile"} className="dropdown-item">
          Profile
        </Link>
        <Link to={"/ordersHistory"} className="dropdown-item">
          Orders History
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
