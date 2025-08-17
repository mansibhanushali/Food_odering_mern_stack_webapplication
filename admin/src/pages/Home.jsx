import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [users, setUsers] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [activeCard, setActiveCard] = useState(null); // null, "users", "orders", "products"

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/getallusers");
        if (res.data.success) {
          setUsers(res.data.users);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    const fetchOrderCount = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/order/count");
        if (res.data.success) {
          setOrderCount(res.data.totalOrders);
        }
      } catch (err) {
        console.error("Error fetching order count:", err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/food/list");
        if (res.data.success) {
          setProducts(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchUsers();
    fetchOrderCount();
    fetchProducts();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="cards-container">
        {!activeCard && (
          <>
            <div className="card" onClick={() => setActiveCard("users")}>
              <h2>Total Users</h2>
              <p className="count">{users.length}</p>
            </div>

            <div className="card" onClick={() => setActiveCard("products")}>
              <h2>Total Food Products</h2>
              <p className="count">{products.length}</p>
            </div>

            <div className="card" onClick={() => setActiveCard("orders")}>
              <h2>Total Orders</h2>
              <p className="count">{orderCount}</p>
            </div>
          </>
        )}

        {activeCard === "users" && (
          <div className="card">
            <h2>Total Users</h2>
            <p className="count">{users.length}</p>
            <button onClick={() => setActiveCard(null)} className="back-btn">← Back</button>
            <div className="table-inside-card">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeCard === "orders" && (
          <div className="card">
            <h2>Total Orders</h2>
            <p className="count">{orderCount}</p>
            <button onClick={() => setActiveCard(null)} className="back-btn">← Back</button>
          </div>
        )}

        {activeCard === "products" && (
          <div className="card">
            <h2>Total Food Products</h2>
            <p className="count">{products.length}</p>
            <button onClick={() => setActiveCard(null)} className="back-btn">← Back</button>
            <div className="table-inside-card">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td>{p.category}</td>
                      <td>₹{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
