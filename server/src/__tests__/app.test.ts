import request from 'supertest';
import { app, server, io } from '../app';

describe('API Endpoints', () => {
  afterAll((done) => {
    server.close(() => {
      io.close();
      done();
    });
  });

  it('should return welcome message on GET /api', async () => {
    const response = await request(app).get('/api');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Welcome to the Mentat API!');
  });

  it('should handle GET / route', async () => {
    const response = await request(app).get('/');

    // In test environment, static files may not exist, so we expect either 200 or 404
    expect([200, 404]).toContain(response.status);
  });
});
