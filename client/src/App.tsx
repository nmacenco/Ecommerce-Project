import React from "react";
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
import Footer from "./components/footer/Footer";
import AdminModeCards from "./components/products/cards/AdminModeCards";

function App(): JSX.Element {
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
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/adminMode" element={<AdminModeCards />} />

        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
