import React from 'react';
import OrderForm from './components/OrderForm';
import OrdersList from './components/OrdersList';
import DriversList from './components/DriversList';

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', maxWidth: 1100, margin: 'auto' }}>
      <h1>ProSched — Delivery Manager (Demo)</h1>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <OrderForm />
        </div>
        <div style={{ flex: 1 }}>
          <DriversList />
          <OrdersList />
        </div>
      </div>
    </div>
  );
}
