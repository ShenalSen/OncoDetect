import React from 'react';
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import './App.css';
import LSideBar from './Components/L-SideBar'; // Ensure correct path

function App() {
  return (
    <BrowserRouter> {/* Wrap everything in BrowserRouter */}
      <div className="flex">
        <LSideBar /> {/* Corrected component name */}
       
      </div>
    </BrowserRouter>
  );
}

export default App;
