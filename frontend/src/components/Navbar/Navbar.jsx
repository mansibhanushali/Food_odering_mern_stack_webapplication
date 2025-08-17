import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from './../../assets/assets';
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from './../context/StoreContext';
import axios from 'axios';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  // Search related state
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  };

  // Search function
  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await axios.get(`http://localhost:4000/api/products/search?q=${query}`);
      setResults(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='navbar'>
      <Link to='/'> <img src={assets.logo} alt="" className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>menu</a>
        <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>contact us</a>
      </ul>
      <div className="navbar-right">
        
        {/* Search Icon */}
        <img 
          src={assets.search_icon} 
          alt="Search" 
          onClick={() => setShowSearch(!showSearch)}
          style={{ cursor: "pointer" }}
        />

        {/* Search Box */}
        {showSearch && (
          <input
            type="text"
            placeholder="Search food..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="search-input"
          />
        )}

        {/* Search Results */}
        {showSearch && results.length > 0 && (
          <div className="search-results">
            {results.map((item) => (
              <div 
                key={item._id} 
                className="search-item"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        )}

        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>

        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar
