const { createClient } = require('redis');

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

module.exports = redisClient;