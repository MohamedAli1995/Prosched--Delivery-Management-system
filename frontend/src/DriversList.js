import React, { useEffect, useState } from 'react';
import API from '../api';

export default function DriversList() {
  const [drivers, setDrivers] = useState([]);
  useEffect(()=> fetch(), []);
  const fetch = async ()=> { const r = await API.get('/drivers'); setDrivers(r.data); };
  const createDummy = async ()=> {
    await API.post('/drivers', { name: 'Driver A', phone: '+21690000000', available: true });
    fetch();
  };
  return (
    <div>
      <h3>Drivers</h3>
      <button onClick={fetch}>Refresh</button>
      <button onClick={createDummy}>Create dummy driver</button>
      <ul>
        {drivers.map(d => <li key={d._id}>{d.name} — {d.phone} — {d.available ? 'available' : 'busy'}</li>)}
      </ul>
    </div>
  );
}
