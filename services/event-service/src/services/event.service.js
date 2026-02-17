const Event = require('../models/event.model');

async function createEvent({ type, payload }) {
    const event = await Event.create({
        type,
        payload,
    });
    return event;
}

async function getEvents(filter) {
    const { type, status } = filter;
    const whereClause = {};

    if (type) {
        whereClause.type = type;
    }
    if (status) {
        whereClause.status = status;
    }
    const events = await Event.findAll({ where: whereClause });
    return events;
}

module.exports = {
    createEvent,
    getEvents,
};
