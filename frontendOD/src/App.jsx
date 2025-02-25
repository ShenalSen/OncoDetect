
import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import DiagnosticResults from "./components/DiagnosticResults";
import { Routes } from 'react-router-dom';

function App() {
    return (
        <><div className="App">
            <Sidebar />
            <div className="content" style={{ marginLeft: '250px', padding: '20px' }}>
                <DiagnosticResults />
                <loging />
            </div>
        </div>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<About />} />
        </Routes></>

    );
}

export default App;
