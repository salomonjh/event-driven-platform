const Event = require('../models/event.model');

/**
 * Retrieves an event by its ID.
 */
async function getEventById(id) {
    const event = await Event.findByPk(id);
    return event;
}

module.exports = {
    getEventById,
};
