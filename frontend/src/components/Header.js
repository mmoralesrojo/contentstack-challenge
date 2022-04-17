import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Planet Management App</h1>
      <hr/>
      <div className="links">
        <NavLink to="/" className={({ isActive }) => "link" + (isActive ? " active" : "")} exact="true">
          Planet List
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => "link" + (isActive ? " active" : "")}>
          Add Planet
        </NavLink>
      </div>
    </header>
  );
};

export default Header;