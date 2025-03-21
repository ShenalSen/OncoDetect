import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/account-settings">Account Settings</Link>
        </li>
        {/* Add other navigation links here */}
      </ul>
    </nav>
  );
};

export default Navigation;