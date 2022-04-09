import React, { useEffect } from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Detail from "./components/detail/Detail";
import Products from "./components/products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Loading from "./components/loading/Loading";
import Edit from "./components/detail/edit/EditProduct";
import FormCreate from "./components/form/FormCreate";
import Home from "./components/home/Home";
import AdminModeCards from "./components/products/cards/AdminModeCards";
import { useDispatch } from "react-redux";
import { FindUSer } from "./redux/actions/user";
import Cart from "./components/cart/Cart";
import CreateCategories from "./components/products/categories/create/CreateCategories";
import ResetForcePassword from "./components/users/ResetForgotPasswords";
import EditUserAccount from "./components/users/EditUserAccount";
import AdminUserMode from "./components/users/AdminPanel/AdminModeUsers";

function App(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FindUSer());
    // console.log("find user!");
  }, []);

  return (
    <div className="App">

      <BrowserRouter>

        <Nav />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/createProduct" element={<FormCreate />} />
          <Route path="/editProduct/:id" element={<Edit />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/createCategory" element={<CreateCategories />} />
          <Route path="/resetForgotPwd" element={<ResetForcePassword />} />
          <Route path="/editUser/:id" element={<EditUserAccount />} />
          <Route path="/productsAdminMode" element={<AdminModeCards />} />
          <Route path="/usersAdminMode" element={<AdminUserMode />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
