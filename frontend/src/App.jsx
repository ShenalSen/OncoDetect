import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LSideBar from './Components/L-SideBar';
import Doctor from './Pages/Doctor';
import PredictionTable from './Pages/PredictionTable';

function App() {
  return (
    <BrowserRouter>
      {/* Use flex to place sidebar and main content side by side. 
          Also use min-h-screen to fill the viewport vertically. */}
      <div className="flex min-h-screen">
        
        {/* Sidebar with a fixed width (e.g., w-64 = 16rem). 
            Adjust width as you prefer or style within LSideBar. */}
        <div className="w-64 bg-gray-200">
          <LSideBar />
        </div>
        
        {/* Main content expands to fill remaining space. */}
        <div className="flex-1">
          <Routes>
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/past-predictions" element={<PredictionTable />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
