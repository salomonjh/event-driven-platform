const request = require('supertest');
const app = require('../src/app');

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
    });

    it('should return 400 if type is missing', async () => {
        const response = await request(app)
            .post('/events')
            .send({
                payload: { foo: 'bar' }
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});
