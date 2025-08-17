import { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from './../../components/context/StoreContext';
import axios from 'axios';
import { assets } from './../../assets/assets';
import { toast } from 'react-toastify';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!token) {
      console.warn("No token found, skipping order fetch.");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      console.log("Orders response:", response.data);

      const orders = response.data?.data || [];
      setData(orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await axios.put(
        `${url}/api/order/cancel/${orderId}`,
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Order cancelled successfully");
        fetchOrders();
      } else {
        toast.error(res.data.message || "Failed to cancel order");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error cancelling order");
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {loading ? (
          <p>Loading orders...</p>
        ) : data.length === 0 ? (
          <p style={{ marginTop: "20px", color: "#555" }}>No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel Icon" />

              <p>
                {order.items?.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 && ', '}
                  </span>
                ))}
              </p>

              <p>₹{order.amount}.00</p>
              <p>Items: {order.items?.length || 0}</p>
              <p>
                <span style={{ color: 'red' }}>&#x25cf;</span>{' '}
                <b>{order.status}</b>
              </p>

              <button onClick={fetchOrders}>Track Order</button>

              {order.status === "Food Processing" && (
  <button 
    style={{ backgroundColor: "#ff4d4d", color: "white", marginLeft: "8px" }}
    onClick={() => cancelOrder(order._id)}
  >
    Cancel Order
  </button>
)}

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
