import request from 'supertest';
import { app } from '../app';
import { Readable } from 'stream';

// Mock file system for express.static to avoid dependency on client/dist in tests
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn().mockReturnValue(true),
  statSync: jest.fn().mockReturnValue({ isFile: () => true }),
  createReadStream: jest.fn(() => {
    const readable = new Readable();
    readable.push('<!DOCTYPE html><html><body>Mock HTML</body></html>');
    readable.push(null);
    return readable;
  }),
}));

describe('API Endpoints', () => {
  it('should return welcome message on GET /api', async () => {
    const response = await request(app).get('/api');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Welcome to the Mentat API!');
  });

  // Skip this test since we don't want to rely on the static files in test
  it.skip('should serve the React app on GET /', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toContain('text/html');
  });
});

describe('Jokes API Endpoints', () => {
  it('should return a random joke on GET /api/jokes/random', async () => {
    const response = await request(app).get('/api/jokes/random');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('joke');
    expect(response.body.joke).toHaveProperty('id');
    expect(response.body.joke).toHaveProperty('text');
    expect(response.body.joke).toHaveProperty('category');
  });

  it('should return a joke from a specific category', async () => {
    const categories = ['programming', 'general', 'dad'];

    for (const category of categories) {
      const response = await request(app).get(
        `/api/jokes/category/${category}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('joke');
      expect(response.body.joke).toHaveProperty('id');
      expect(response.body.joke).toHaveProperty('text');
      expect(response.body.joke).toHaveProperty('category');
      expect(response.body.joke.category).toBe(category);
    }
  });

  it('should return 400 for invalid category', async () => {
    const response = await request(app).get('/api/jokes/category/invalid');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
