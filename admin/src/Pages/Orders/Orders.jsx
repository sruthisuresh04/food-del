import React from 'react'
import './Orders.css'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import axios from "axios";
import { assets } from '../../assets/assets'

const Orders = ({url}) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data || response.data.orders || []);
      console.log(response.data.data);
    } else {
      toast.error("error");
    }
  }

  const statusHandler = async (event,orderId) =>{
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status:event.target.value
    });
    if (response.data.success){
      toast.success("order status changed")
      fetchAllOrders();
    }
    else{
      toast.error("error")
    }
    
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

return (
  <div className="order add">
    <h2>Order Page</h2>
    <div className="order-list">
      {(orders || []).map((order, index) => (
        <div className="order-item" key={order._id || index}>
          <img src={assets.parcel_icon} alt="" />
          <div>
            <p className="order-item-food">
              {(order.items || []).map((item, idx) => {
                if (idx === ((order.items && order.items.length) ? order.items.length - 1 : 0)) {
                  return item.name + " X " + item.quantity;
                } else {
                  return item.name + " X " + item.quantity + ", ";
                }
              })}
            </p>
            <p className="order-item-name">
              {(order.address?.firstName || "") + " " + (order.address?.lastName || "")}
            </p>
            <div className="order-item-address">
              <p>{order.address?.street ? order.address.street + " , " : ""}</p>
              <p>
                {[order.address?.city, order.address?.state, order.address?.country, order.address?.zipcode]
                  .filter(Boolean)
                  .join(" , ")}
              </p>
            </div>
            <p className="order-item-phone">{order.address?.phone || ""}</p>
          </div>
          <p>Items : {(order.items || []).length}</p>
          <p>${order.amount}</p>
          <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
            <option value="food Processing">food Processing</option>
            <option value="out of delivery">out of delivery</option>
            <option value="delivered">delivered</option>
            <option value="canceled">canceled</option>
            <option value="on the way">on the way</option>
          </select>
        </div>
      ))}
    </div>
  </div>
);
}

export default Orders;