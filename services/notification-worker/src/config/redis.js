const { createClient } = require('redis');

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`
});

redisClient.on('connect', () => console.log('Worker connected to Redis'));
redisClient.on('error', (err) => console.error('Worker Redis Error', err));

module.exports = redisClient;