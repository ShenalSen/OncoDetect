// src/components/Sidebar.jsx

import React from 'react';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>OncoDetect</h2>
      </div>
      <div className="nav-links">
        <a href="#dashboard">Dashboard</a>
        <a href="#predictions">Past Predictions</a>
        <a href="#doctor">Doctor</a>
        <a href="#reports">Reports</a>
        <a href="#settings">Settings</a>
        <a href="#logout">Logout</a>
      </div>
    </div>
  );
}

export default Sidebar;

