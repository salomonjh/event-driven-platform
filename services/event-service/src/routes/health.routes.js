const express = require('express');
const router = express.Router();
const { getHealth } = require('../controllers/health.controller');
const asyncHandler = require('../utils/asyncHandler');

router.get('/health', asyncHandler(getHealth));

module.exports = router;
