import React, { useContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Home from './pages/Home';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminDataContext } from './context/AdminContext';

const App = () => {
  const { adminData } = useContext(adminDataContext);
  const url = 'http://localhost:4000';

  return (
    <div>
      <ToastContainer />

      {adminData && <Navbar />}
      <hr />

      <div className="app-content" style={{ display: 'flex' }}>
        {adminData && <Sidebar />}

        <Routes>
          <Route path="/" element={adminData ? <Home /> : <Navigate to="/login" />} />
          <Route path="/add" element={adminData ? <Add url={url} /> : <Navigate to="/login" />} />
          <Route path="/list" element={adminData ? <List url={url} /> : <Navigate to="/login" />} />
          <Route path="/orders" element={adminData ? <Orders url={url} /> : <Navigate to="/login" />} />
          <Route path="/login" element={!adminData ? <Login /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
