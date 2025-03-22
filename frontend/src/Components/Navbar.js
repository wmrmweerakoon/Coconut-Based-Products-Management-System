import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../App.css';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-container">
        <NavLink to="/" className="logo-container">
          <img src={logo} alt="Coco Hub Logo" className="logo" />
          <span className="logo-text">Coco Hub</span>
        </NavLink>
        <div className="nav-links">
          <NavLink to="/" activeClassName="active">Home</NavLink>
          <NavLink to="/become-supplier" activeClassName="active">Become a Supplier</NavLink> 
          <NavLink to="/products" activeClassName="active">Products</NavLink>
          <NavLink to="/login" activeClassName="active">Login</NavLink>
          <NavLink to="/contact" activeClassName="active">Contact Us</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
