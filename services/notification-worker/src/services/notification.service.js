const Notification = require('../models/notification.model.js');

/**
 * Creates a notification for a given event. If a notification for the event already exists, it returns the existing one.
 */
async function createNotification({ eventId, status, payload }) {
    return Notification.findOrCreate({
        where: { eventId },
        defaults: {
            status,
            payload,
        },
    });
}

module.exports = {
    createNotification,
};
