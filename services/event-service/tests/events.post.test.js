const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');
const redisClient = require('../src/config/redis');

// Mock redis to prevent actual Redis calls during tests
jest.mock('../src/config/redis', () => ({
    connect: jest.fn().mockResolvedValue(true),
    publish: jest.fn().mockResolvedValue(1),
    on: jest.fn(),
}));

beforeEach(async () => {
    // Clear events table before each test to ensure isolation
    await sequelize.query('TRUNCATE TABLE events RESTART IDENTITY CASCADE');

    // clear mocks to reset call counts and arguments for each test
    jest.clearAllMocks();
});

afterAll(async () => {
    // Close the database connection after all tests are done
    await sequelize.close();
});

describe('POST /events', () => {
    it('should create an event and return eventId', async () => {
        const response = await request(app)
            .post('/events')
            .send({
                type: 'USER_CREATED',
                payload: {
                    userId: 123,
                    email: 'test@test.com'
                }
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('eventId');

        // Check that the event was published to Redis
        expect(redisClient.publish).toHaveBeenCalledWith(
            'events.created',
            expect.stringContaining('USER_CREATED')
        );
    });

    it('should return 400 if type is missing', async () => {
        const response = await request(app)
            .post('/events')
            .send({
                payload: { foo: 'bar' }
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');

        // Check that Redis was not called (thanks to clearAllMocks being called)
        expect(redisClient.publish).not.toHaveBeenCalled();
    });
});
