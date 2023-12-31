import React, { useState, useEffect } from "react";
import StockPrice from "./components/StockPrice";
import "bootstrap/dist/css/bootstrap.min.css";
import StockTable from "./components/StockTable";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import UserAuth from "./components/Login";
import Portfolio from "./components/Portfolio";
import "./App.css"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock-chart/:symbol" element={<StockTable />} />
        <Route path="/stockdetails" element={<StockPrice />} />
        <Route path="/predict" element={<StockPrice />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/userAuth" element={<UserAuth/>} />
        <Route path="/portfolio" element={<Portfolio/>} />
        {/* <Route path="/stock-news" element={<News />} /> */}
      </Routes>
      {/* <StockPrice />
      <StockChart /> */}
    </BrowserRouter>
  );
}

export default App;
