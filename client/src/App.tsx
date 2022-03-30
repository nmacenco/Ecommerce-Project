import React from 'react';
import 'bootswatch/dist/lux/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";

function App(): JSX.Element {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/detail/:id" element={<Detail/>} />
          <Route path="*" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
