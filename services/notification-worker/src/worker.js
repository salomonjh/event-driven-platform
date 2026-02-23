console.log("notification-worker initialized");
const redisClient = require('./config/redis');

async function startWorker() {
    await redisClient.connect();

    // Create subscriber client to listen for events
    const subscriber = redisClient.duplicate();
    await subscriber.connect();

    console.log('Worker waiting for events on channel: events.created');

    await subscriber.subscribe('events.created', (message) => {
        const eventData = JSON.parse(message);
        console.log('Event Received:', eventData);
    });
}

startWorker().catch(console.error);