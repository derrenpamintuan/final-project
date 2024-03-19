import { useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';
import { FaBars, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import { IoRestaurant, IoHomeSharp } from 'react-icons/io5';
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
        <h1 className="nav-title">
          Fine-Dine <IoRestaurant className="io-restaurant" />
        </h1>
        {user && <FaBars className="fa-bars" onClick={handleMenu} />}
        {user && (
          <div className="full-screen-options">
            {' '}
            <p
              className="menu-options"
              onClick={() => {
                navigate('/');
              }}>
              <IoHomeSharp className="menu-icon" />
              Home
            </p>
            <p
              className="menu-options"
              onClick={() => {
                navigate('/saved');
              }}>
              <FaHeart className="menu-icon" />
              Saved
            </p>
            <p
              className="menu-options"
              onClick={() => {
                handleSignOut();
              }}>
              <FaSignOutAlt className="menu-icon" />
              Sign Out
            </p>
          </div>
        )}
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
              navigate('/saved');
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
