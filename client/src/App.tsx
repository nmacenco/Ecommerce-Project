import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormCreate from './components/FormCreate';
import "bootswatch/dist/lux/bootstrap.min.css";
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import Products from "./components/products/Products";

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/createRecipe" element={<FormCreate />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
