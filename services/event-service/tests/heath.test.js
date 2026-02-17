const request = require('supertest');
const app = require('../src/app');

describe('Health Controller', () => {
    it('should return 200 and connected status', async () => {
        const res = await request(app).get('/health');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('db', 'connected');
    });
});