const eventService = require('../services/event.service');
const redisClient = require('../config/redis');

/**
 * POST /events
 * Check the health status of the service and the connection to the database.
 */
exports.createEvent = async (req, res) => {
    const { type, payload } = req.body;

    if (!type || !payload) {
        return res.status(400).json({
            error: 'type and payload are required',
        });
    }

    const event = await eventService.createEvent({ type, payload });

    // Publish the event to Redis so that workers can process it
    await redisClient.publish(
        'events.created',
        JSON.stringify({
            id: event.id,
            type: event.type,
            payload: event.payload,
        })
    );

    res.status(201).json({
        eventId: event.id,
    });
};

/**
 * GET /events
 * Retrieve events based on query parameters.
 */
exports.getEvents = async (req, res) => {
    const { type, status } = req.query;
    const filter = {};

    if (type) {
        filter.type = type;
    }
    if (status) {
        filter.status = status;
    }

    const events = await eventService.getEvents(filter);

    res.status(200).json({
        events,
    });
};