import React, { useState, useEffect } from 'react';
import StockPrice from './components/StockPrice';
import 'bootstrap/dist/css/bootstrap.min.css';
import StockTable from './components/StockTable';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<StockPrice />} />
      <Route path="/stock-chart/:symbol" element={<StockTable />} />
    </Routes>
      {/* <StockPrice />
      <StockChart /> */}
    </BrowserRouter>
  );
}

export default App;
