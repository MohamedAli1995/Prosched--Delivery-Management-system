import React, { useEffect, useState } from 'react';
import API from '../api';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { fetchOrders(); }, []);
  const fetchOrders = async () => {
    const res = await API.get('/orders');
    setOrders(res.data);
  };
  return (
    <div>
      <h3>Orders</h3>
      <button onClick={fetchOrders}>Refresh</button>
      <ul>
        {orders.map(o => (
          <li key={o._id}>
            <strong>{o.customerName}</strong> — {o.address} — <em>{o.status}</em> — Driver: {o.assignedDriver ? o.assignedDriver.name : 'None'}
          </li>
        ))}
      </ul>
    </div>
  );
}
