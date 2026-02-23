const express = require('express');
const axios = require('axios'); // Install this: npm install axios
const client = require('prom-client');
const logger = require('./logger')('order-service');

const app = express();

// Prometheus Metrics
const register = new client.Registry();
const orderCounter = new client.Counter({
  name: 'total_orders_placed',
  help: 'Total number of orders',
  registers: [register]
});

app.get('/place-order', async (req, res) => {
  const start = Date.now();
  try {
    // Call the Inventory Service
    await axios.get('http://localhost:4000/check-stock');
    
    orderCounter.inc();
    logger.info({ message: 'Order placed successfully', orderId: Math.floor(Math.random() * 1000) });
    res.status(201).send('Order Created');
  } catch (error) {
    logger.error({ message: 'Order failed', error: error.message });
    res.status(500).send('Order Failed');
  } finally {
    const duration = Date.now() - start;
    logger.info({ message: 'Request processed', durationMs: duration });
  }
});

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.listen(3001, () => console.log('Order Service on port 3001'));