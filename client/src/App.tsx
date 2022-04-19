import React, { useEffect, useState } from "react";
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
import EmailResetPassword from './components/users/EmailResetPassword'
import { ResetPwd } from "./components/users/ResetPwd";
import UserProfile from "./components/users/profile/UserProfile";
import WishList from "./components/users/wishList/WishList";
import DeleteCategories from "./components/products/categories/delete/DeleteCategories";
import ValidateAccount from "./components/users/ValidateAccount";
import OrdersHistory from "./components/users/ordersHistory/OrdersHistory";
import About from "./components/nav/about/About";
import OrdersAdmin from "./components/admin/ordersAdmin/OrdersAdmin";
import ShippingAddressForm from "./components/checkout/shippingAddress/shippingAddressForm";
import PreviewOrder from "./components/checkout/previewOrder/PreviewOrder";
import NewReview from "./components/users/ordersHistory/orderRow/newReview/NewReview";



function App(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FindUSer());
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
          <Route path="/sessions/recover/:token" element={<ResetForcePassword />} />
          <Route path="/editUser/:token" element={<EditUserAccount />} />
          <Route path="/productsAdminMode" element={<AdminModeCards />} />
          <Route path="/usersAdminMode" element={<AdminUserMode />} />
          <Route path="/emailReset" element={<EmailResetPassword />} />
          <Route path="/resetpwd" element={<ResetPwd />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/ordersHistory" element={<OrdersHistory />} />
          <Route path="/wishList" element={<WishList />} />
          <Route path="/deleteCategory" element={<DeleteCategories />} />
          <Route path="/validateAccount/:id" element={<ValidateAccount />} />
          <Route path="/about" element={<About />} />
          <Route path="/ordersAdmin" element={<OrdersAdmin />} />
          <Route path="/shippingAddress" element={<ShippingAddressForm />} />
          <Route path="/previewOrder" element={<PreviewOrder />} />
          <Route path="/newReview/:userId/:productId" element={<NewReview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
