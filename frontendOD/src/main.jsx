// // src/main.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css'; // Make sure to import your styles

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );




// // src/main.jsx

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );




import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
