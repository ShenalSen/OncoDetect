import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LSideBar from './Components/L-SideBar';
import Doctor from './Pages/Doctor';
import PredictionTable from './Pages/PredictionTable';

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <LSideBar />
        <Routes>
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/past-predictions" element={<PredictionTable />} />

          
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
