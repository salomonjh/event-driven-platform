const app = require('./app');
const redisClient = require('./config/redis');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await redisClient.connect();
        console.log('Redis connected');
        app.listen(PORT, () => {
        console.log(`Event service running on port ${PORT}`);
});
    } catch (error) {
        console.error('Failed to connect to Redis:', error.message);
        process.exit(1);
    }
}

startServer();

