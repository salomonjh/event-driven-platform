const redisClient = require('./config/redis');
const sequelize = require('./config/database');
const { createNotification } = require('./services/notification.service');

async function startWorker() {
    // conect redis client
    await redisClient.connect();

    // Create subscriber client to listen for events
    const subscriber = redisClient.duplicate();
    await subscriber.connect();

    console.log('Worker waiting for events on channel: events.created');

    await subscriber.subscribe('events.created', async (message) => {
        try {
            const eventData = JSON.parse(message);
            console.log('Event Received:', eventData);

            // create a notification based on the event
            const notification = await createNotification({
                eventId: eventData.id,
                status: 'PENDING',
                payload: eventData.payload
            });

            // Simulate processing time
            console.log(`Processing notification for event ${eventData.id}...`);
            await new Promise(resolve => setTimeout(resolve, 10000));

            // Update notification status
            notification.status = 'SENT';
            await notification.save();
            console.log(`Notification for event ${eventData.id} completed.`);
        } catch (error) {
            console.error('Error processing event:', error);
        };
    });
}

startWorker().catch(error => console.error('Error starting worker:', error));