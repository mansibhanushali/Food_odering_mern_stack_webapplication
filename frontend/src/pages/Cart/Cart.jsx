import { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../components/context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    removeItemCompletely, // ✅ full remove function from context
    getTotalCartAmount,
    url,
    clearCart
  } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className='cart'>
      {/* Clear cart button */}
      <div className="cart-items-header">
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to clear the cart?")) {
              clearCart();
            }
          }}
          className="clear-cart-btn-top"
        >
          CLEAR CART
        </button>
      </div>
      <br />

      {/* Cart items */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + '/images/' + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>

                  {/* Quantity controls */}
                  <p className="quantity-control">
                    <button
                      className="qty-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      -
                    </button>
                    {cartItems[item._id]}
                    <button
                      className="qty-btn"
                      onClick={() => addToCart(item._id)}
                    >
                      +
                    </button>
                  </p>

                  <p>₹{item.price * cartItems[item._id]}</p>

                  {/* Full remove button */}
                  <p
                    onClick={() => {
                      if (window.confirm("Remove this item from cart?")) {
                        removeItemCompletely(item._id);
                      }
                    }}
                    className='cross'
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Cart totals */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo code */}
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
