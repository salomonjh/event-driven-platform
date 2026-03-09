const Notification = require('../models/notification.model.js');

async function createNotification({ eventId, status, payload }) {
    const notification = await Notification.create({
        eventId,
        status,
        payload,
    });
    return notification;
}

module.exports = {
    createNotification,
};
