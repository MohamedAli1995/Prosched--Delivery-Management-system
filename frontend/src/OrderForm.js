import React, { useState } from 'react';
import API from '../api';

export default function OrderForm() {
  const [form, setForm] = useState({ customerName: '', customerPhone: '', address: '', lat: '', lng: '', priority: 1 });
  const [msg, setMsg] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/orders', {
        ...form,
        lat: form.lat ? parseFloat(form.lat) : undefined,
        lng: form.lng ? parseFloat(form.lng) : undefined,
        priority: parseInt(form.priority)
      });
      setMsg('Order created');
      setForm({ customerName: '', customerPhone: '', address: '', lat: '', lng: '', priority: 1});
    } catch (err) {
      setMsg('Error creating order');
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      <form onSubmit={submit}>
        <div><input name="customerName" value={form.customerName} onChange={onChange} placeholder="Customer name" required/></div>
        <div><input name="customerPhone" value={form.customerPhone} onChange={onChange} placeholder="Phone" required/></div>
        <div><input name="address" value={form.address} onChange={onChange} placeholder="Address" required/></div>
        <div style={{display:'flex', gap:8}}>
          <input name="lat" value={form.lat} onChange={onChange} placeholder="lat (optional)"/>
          <input name="lng" value={form.lng} onChange={onChange} placeholder="lng (optional)"/>
        </div>
        <div><select name="priority" value={form.priority} onChange={onChange}>
          <option value={1}>Normal</option>
          <option value={2}>High</option>
          <option value={3}>Urgent</option>
        </select></div>
        <button type="submit">Create</button>
      </form>
      <div>{msg}</div>
      <div style={{marginTop: 10}}>
        <button onClick={async ()=> { await API.post('/orders/assign'); alert('Assign request sent'); }}>Run auto-assign</button>
      </div>
    </div>
  );
}
