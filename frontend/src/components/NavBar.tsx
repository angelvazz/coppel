// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';
import { Dashboard } from '../pages/Dashboard';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1>App</h1>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/dashboard'}>Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
