import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  const [editPrice, setEditPrice] = useState('');

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching food list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        throw new Error(response.data.message || 'Error occurred while removing food.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unexpected error';
      toast.error(errorMessage);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`${url}/api/food/update`, {
        id,
        category: editCategory,
        price: editPrice
      });
      if (res.data.success) {
        toast.success("Updated successfully");
        setEditItemId(null);
        fetchList();
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Update error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt="" />
            <p>{item.name}</p>

            {editItemId === item._id ? (
              <>
                <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                  <option value="Salad">Salad</option>
                  <option value="Paratha">Paratha</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Festival Specials">Festival Specials</option>
                  <option value="Gujarati Thali">Gujarati Thali</option>
                  <option value="Gujarati Shaak">Gujarati Shaak</option>
                  <option value="Rice & Khichdi">Rice & Khichdi</option>
                  <option value="Drinks / Chaas">Drinks / Chaas</option>
                </select>

                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  style={{ width: "60px" }}
                />

                <div className="action-btns">
                  <button onClick={() => handleUpdate(item._id)}>💾</button>
                  <button onClick={() => setEditItemId(null)}>❌</button>
                </div>
              </>
            ) : (
              <>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <div className="action-btns">
                  <span onClick={() => {
                    setEditItemId(item._id);
                    setEditCategory(item.category);
                    setEditPrice(item.price);
                  }} className="cursor">✏️</span>
                  &nbsp;
                  <span onClick={() => removeFood(item._id)} className="cursor">🗑️</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
