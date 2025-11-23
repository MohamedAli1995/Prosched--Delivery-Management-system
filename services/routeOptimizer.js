const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => v * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

function assignOrdersToDrivers(orders, drivers) {
  const assignments = drivers.map(d => ({ driverId: d._id, orders: [], driverLat: d.currentLat || 0, driverLng: d.currentLng || 0 }));
  const sorted = orders.slice().sort((a,b) => b.priority - a.priority || new Date(a.createdAt) - new Date(b.createdAt));
  for (const order of sorted) {
    let best = null;
    let bestDist = Infinity;
    for (const a of assignments) {
      const centerLat = a.orders.length ? a.orders[a.orders.length-1].lat : a.driverLat;
      const centerLng = a.orders.length ? a.orders[a.orders.length-1].lng : a.driverLng;
      const dist = haversine(centerLat, centerLng, order.lat || 0, order.lng || 0);
      if (dist < bestDist) { bestDist = dist; best = a; }
    }
    if (best) best.orders.push(order);
  }
  return assignments;
}

module.exports = { assignOrdersToDrivers };
