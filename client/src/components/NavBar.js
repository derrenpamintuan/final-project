import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AppContext from '../components/AppContext';
import { FaBars, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import { IoRestaurant, IoHomeSharp } from 'react-icons/io5';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleSignOut } = useContext(AppContext);
  const navigate = useNavigate();

  function handleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <nav>
        <h1 className="nav-title">Fine-Dine</h1>
        <IoRestaurant className="io-restaurant" />
        {user && <FaBars className="fa-bars" onClick={handleMenu} />}
      </nav>
      {isOpen && (
        <div className="menu-container">
          <p
            className="menu-options"
            onClick={() => {
              navigate('/');
              handleMenu();
            }}>
            <IoHomeSharp className="menu-icon" />
            Home
          </p>
          <p
            className="menu-options"
            onClick={() => {
              // navigate('/saved');
              handleMenu();
            }}>
            <FaHeart className="menu-icon" />
            Saved
          </p>
          <p
            className="menu-options"
            onClick={() => {
              handleSignOut();
              handleMenu();
            }}>
            <FaSignOutAlt className="menu-icon" />
            Sign Out
          </p>
        </div>
      )}
      <Outlet />
    </>
  );
}
