import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormCreate from './components/FormCreate/FormCreate';
import "bootswatch/dist/lux/bootstrap.min.css";
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import Products from "./components/products/Products";
import Loading from "./components/loading/Loading";

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
          <Route path="/products" element={<Products />} />
          <Route path="/loading" element={<Loading />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
