import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="*" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
