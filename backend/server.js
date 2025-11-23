require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ordersRouter = require('./routes/orders');
const driversRouter = require('./routes/drivers');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err=> console.error('MongoDB connection error:', err));

app.use('/api/orders', ordersRouter);
app.use('/api/drivers', driversRouter);

app.get('/', (req, res) => res.send('ProSched API running'));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
