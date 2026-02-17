const express = require('express');
const router = express.Router();
const { createEvent, getEvents } = require('../controllers/event.controller');
const asyncHandler = require('../utils/asyncHandler');

router.post('/events', asyncHandler(createEvent));
router.get('/events', asyncHandler(getEvents));

module.exports = router;
