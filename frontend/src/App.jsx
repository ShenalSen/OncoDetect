import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LSideBar from './Components/L-SideBar';
import Doctor from './Pages/Doctor';

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <LSideBar />
        <Routes>
          <Route path="/doctor" element={<Doctor />} />
          
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
