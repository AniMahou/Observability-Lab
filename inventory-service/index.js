const express = require('express');
const client = require('prom-client');
const logger = require('./logger')('inventory-service');

const app = express();
let isChaosMode = false;

// Prometheus Setup
const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get('/check-stock', async (req, res) => {
  // Simulate heavy processing if Chaos Mode is ON
  const delay = isChaosMode ? 5000 : 100; 
  
  setTimeout(() => {
    logger.info({ message: 'Stock check completed', item: 'Gaming Console', status: 'available' });
    res.json({ status: 'in_stock' });
  }, delay);
});

// Route to turn the "Gremlin" on/off
app.get('/toggle-chaos', (req, res) => {
  isChaosMode = !isChaosMode;
  logger.warn(`Chaos Mode is now ${isChaosMode ? 'ON - Expect Latency!' : 'OFF'}`);
  res.send(`Chaos Mode: ${isChaosMode}`);
});

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.listen(4000, () => console.log('Inventory Service on port 4000'));