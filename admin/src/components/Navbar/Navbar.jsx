import React, { useContext } from 'react';
import './Navbar.css';
import { assets } from './../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { adminDataContext } from '../../context/AdminContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(adminDataContext); // 👈 context logout

  const handleLogout = () => {
    logout(); // clear context + localStorage
    navigate("/login"); // navigate to login
  };

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />

      <div className="navbar-right">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <img src={assets.profile_image} alt="Profile" className="profile" />
      </div>
    </div>
  );
};

export default Navbar;
