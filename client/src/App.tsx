import React from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/form/Form";
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import Products from "./components/products/Products";

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/createRecipe" element={<Form />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
