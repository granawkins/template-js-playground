import request from 'supertest';
import { app } from '../app';
import wikipediaService from '../services/wikipediaService';

// Mock the Wikipedia service
jest.mock('../services/wikipediaService');
const mockedWikipediaService = wikipediaService as jest.Mocked<
  typeof wikipediaService
>;

describe('Wikipedia Routes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /api/wikipedia/random', () => {
    it('should return a random article', async () => {
      // Mock the service response
      mockedWikipediaService.getRandomArticle.mockResolvedValueOnce({
        id: 123,
        title: 'Test Article',
        excerpt: 'This is a test article excerpt',
        thumbnailUrl: 'https://example.com/thumbnail.jpg',
        fullImageUrl: 'https://example.com/image.jpg',
        url: 'https://en.wikipedia.org/wiki/Test_Article',
        fetchedAt: new Date(),
      });

      const response = await request(app).get('/api/wikipedia/random');

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(123);
      expect(response.body.title).toBe('Test Article');
      expect(mockedWikipediaService.getRandomArticle).toHaveBeenCalledTimes(1);
    });

    it('should handle errors and return 500 status', async () => {
      // Mock a service error
      mockedWikipediaService.getRandomArticle.mockRejectedValueOnce(
        new Error('Service error')
      );

      const response = await request(app).get('/api/wikipedia/random');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe(
        'Failed to fetch random Wikipedia article'
      );
      expect(response.body.message).toBe('Service error');
    });
  });

  describe('GET /api/wikipedia/random-batch', () => {
    it('should return multiple random articles', async () => {
      // Mock the service response
      mockedWikipediaService.getRandomArticles.mockResolvedValueOnce([
        {
          id: 123,
          title: 'Test Article 1',
          excerpt: 'This is test article 1',
          thumbnailUrl: 'https://example.com/thumbnail1.jpg',
          fullImageUrl: 'https://example.com/image1.jpg',
          url: 'https://en.wikipedia.org/wiki/Test_Article_1',
          fetchedAt: new Date(),
        },
        {
          id: 456,
          title: 'Test Article 2',
          excerpt: 'This is test article 2',
          thumbnailUrl: 'https://example.com/thumbnail2.jpg',
          fullImageUrl: 'https://example.com/image2.jpg',
          url: 'https://en.wikipedia.org/wiki/Test_Article_2',
          fetchedAt: new Date(),
        },
      ]);

      const response = await request(app).get(
        '/api/wikipedia/random-batch?count=2'
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe('Test Article 1');
      expect(response.body[1].title).toBe('Test Article 2');
      expect(mockedWikipediaService.getRandomArticles).toHaveBeenCalledWith(2);
    });

    it('should default to 5 articles if count is not specified', async () => {
      // Mock the service response
      mockedWikipediaService.getRandomArticles.mockResolvedValueOnce([]);

      await request(app).get('/api/wikipedia/random-batch');

      expect(mockedWikipediaService.getRandomArticles).toHaveBeenCalledWith(5);
    });

    it('should validate the count parameter', async () => {
      const response = await request(app).get(
        '/api/wikipedia/random-batch?count=invalid'
      );

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid count parameter');
    });

    it('should limit the maximum count to 20', async () => {
      const response = await request(app).get(
        '/api/wikipedia/random-batch?count=100'
      );

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid count parameter');
    });

    it('should handle service errors', async () => {
      // Mock a service error
      mockedWikipediaService.getRandomArticles.mockRejectedValueOnce(
        new Error('Service error')
      );

      const response = await request(app).get(
        '/api/wikipedia/random-batch?count=3'
      );

      expect(response.status).toBe(500);
      expect(response.body.error).toBe(
        'Failed to fetch random Wikipedia articles'
      );
    });
  });

  describe('POST /api/wikipedia/clear-cache', () => {
    it('should clear the cache and return success message', async () => {
      const response = await request(app).post('/api/wikipedia/clear-cache');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Cache cleared successfully');
      expect(mockedWikipediaService.clearCache).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when clearing cache', async () => {
      // Mock a service error
      mockedWikipediaService.clearCache.mockImplementationOnce(() => {
        throw new Error('Cache error');
      });

      const response = await request(app).post('/api/wikipedia/clear-cache');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to clear cache');
      expect(response.body.message).toBe('Cache error');
    });
  });
});
