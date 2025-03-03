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
        
        {/* Main area: top bar + routed pages below */}
        <div className="flex-1 flex flex-col">
          {/* Top bar (Dashboard + Search) */}
          <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div>
              <input
                type="text"
                placeholder="Search Past Predictions"
                className="border border-gray-300 rounded-md px-3 py-1"
              />
            </div>
          </div>

          {/* Main content (pages) goes here */}
          <div className="p-6 flex-1">
            <Routes>
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/past-predictions" element={<PredictionTable />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
