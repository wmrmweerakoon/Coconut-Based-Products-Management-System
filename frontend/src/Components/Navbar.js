import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
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
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/become-supplier" className={({ isActive }) => isActive ? "active" : ""}>Become a Supplier</NavLink> 
          <NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>Products</NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Login</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact Us</NavLink>
          <NavLink to="/about-us" className={({ isActive }) => isActive ? "active" : ""}>About Us</NavLink>
          <NavLink to="/signup" className={({ isActive }) => isActive ? "active" : ""}>Register</NavLink>
          <NavLink to="/profile" className="profile-icon">
            <FaUserCircle size={24} />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
