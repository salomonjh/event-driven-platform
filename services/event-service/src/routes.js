const express = require('express');

const healthRoutes = require('./routes/health.routes');
const eventRoutes = require('./routes/event.routes');

const router = express.Router();

// Health
router.use(healthRoutes);

// Events
router.use(eventRoutes);

module.exports = router;
