const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Driver = require('../models/Driver');
const { assignOrdersToDrivers } = require('../services/routeOptimizer');
const { sendSms } = require('../services/twilioClient');

router.post('/', async (req, res) => {
  try {
    const { customerName, customerPhone, address, lat, lng, priority } = req.body;
    const order = new Order({ customerName, customerPhone, address, lat, lng, priority });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('assignedDriver');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/assign', async (req, res) => {
  try {
    const pending = await Order.find({ status: 'pending' });
    const drivers = await Driver.find({ available: true });
    const assignments = assignOrdersToDrivers(pending, drivers);

    for (const a of assignments) {
      if (!a.orders.length) continue;
      const driver = await Driver.findById(a.driverId);
      for (const o of a.orders) {
        await Order.findByIdAndUpdate(o._id, { assignedDriver: driver._id, status: 'assigned' });
      }
      const phone = driver.phone;
      const body = `New deliveries assigned: ${a.orders.length}. Please check your app.`;
      sendSms(phone, body).catch(err => console.error('SMS error', err));
    }

    res.json({ assigned: assignments.map(a => ({ driverId: a.driverId, count: a.orders.length })) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
