import { createContext, useState } from "react";

export const adminDataContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(
    JSON.parse(localStorage.getItem("adminData")) || null
  );

  const login = (data) => {
    setAdminData(data);
    localStorage.setItem("adminData", JSON.stringify(data));
  };

  const logout = () => {
    setAdminData(null);
    localStorage.removeItem("adminData");
  };

  return (
    <adminDataContext.Provider value={{ adminData, login, logout }}>
      {children}
    </adminDataContext.Provider>
  );
};

export default AdminContextProvider;