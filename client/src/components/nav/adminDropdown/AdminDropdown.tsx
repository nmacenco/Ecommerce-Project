import React from "react";
import { DropdownMenu } from "./AdminDropdownStyle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../../../redux/actions/user";
import { adminresetUsers } from "../../../redux/actions/adminUser";

const AdminDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    // dispatch(adminresetUsers())
    dispatch(LogoutUser());
    navigate('/products')
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
        Admin
      </a>
      <DropdownMenu className="dropdown-menu">
        <Link className="dropdown-item" to="/createProduct">
          Create product
        </Link>
        <Link className="dropdown-item" to="/createCategory">
          Create category
        </Link>
        <Link to={'/productsAdminMode'} className="dropdown-item" >
          Admin products
        </Link>
        <Link to={'/usersAdminMode'} className="dropdown-item" >
          Admin users
        </Link>
        <div className="dropdown-divider"></div>
        {/* Esto deberia ser un boton que se aprete y aparezca una alerta de confirmacion de log out */}
        <a onClick={logout} className="dropdown-item" href="#">
          Log out
        </a>
      </DropdownMenu>
    </ul>
  );
};

export default AdminDropdown;
