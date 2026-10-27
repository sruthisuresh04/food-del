
import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../../Context/StoreContext";
import axios from "axios";
import { assets } from "../../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!token) {
      setData([]);
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `${url}/api/order/userorders`,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setData(response.data.data || []);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data || error.message
      );
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  if (!token) {
    return (
      <div className="my-orders">
        <h2>My Orders</h2>
        <p>Please login to view your orders.</p>
      </div>
    );
  }

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      <div className="container">
        {loading ? (
          <p>Loading orders...</p>
        ) : data.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          data.map((order) => (
            <div className="my-orders-order" key={order._id}>
              <img src={assets.parcel_icon} alt="Order" />

              <p>
                {(order.items || []).map((item, idx) => (
                  <React.Fragment key={idx}>
                    {item.name} X {item.quantity}
                    {idx !== order.items.length - 1 ? ", " : ""}
                  </React.Fragment>
                ))}
              </p>

              <p>${order.amount}.00</p>

              <p>
                Items: {(order.items || []).reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </p>

              <p>
                <span>&#x25cf;</span>{" "}
                <b>{order.status}</b>
              </p>

              <button onClick={fetchOrders}>
                Track Order
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;

