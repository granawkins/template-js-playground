import axios from 'axios';
import wikipediaService from '../services/wikipediaService';
import { WikipediaCache } from '../types/wikipedia';

// Create a testing interface that exposes private members for testing
interface WikipediaServiceForTesting {
  cache: WikipediaCache;
  clearCache: () => void;
}

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Wikipedia Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // Reset the cache by accessing private property (for testing purposes)
    (wikipediaService as WikipediaServiceForTesting).clearCache();
  });

  describe('getRandomArticle', () => {
    it('should fetch a single random article', async () => {
      // Mock the random titles response
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          query: {
            random: [{ id: 123, title: 'Test Article', ns: 0 }],
          },
        },
      });

      // Mock the article details response
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          query: {
            pages: {
              '123': {
                pageid: 123,
                ns: 0,
                title: 'Test Article',
                extract: 'This is a test article extract',
                thumbnail: {
                  source: 'https://example.com/thumbnail.jpg',
                  width: 300,
                  height: 200,
                },
                originalimage: {
                  source: 'https://example.com/image.jpg',
                  width: 800,
                  height: 600,
                },
                canonicalurl: 'https://en.wikipedia.org/wiki/Test_Article',
              },
            },
          },
        },
      });

      const article = await wikipediaService.getRandomArticle();

      expect(article).toBeDefined();
      expect(article.id).toBe(123);
      expect(article.title).toBe('Test Article');
      expect(article.excerpt).toBe('This is a test article extract');
      expect(article.thumbnailUrl).toBe('https://example.com/thumbnail.jpg');
      expect(article.fullImageUrl).toBe('https://example.com/image.jpg');
      expect(article.url).toBe('https://en.wikipedia.org/wiki/Test_Article');
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });

    it('should handle errors when fetching a random article', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(wikipediaService.getRandomArticle()).rejects.toThrow(
        'API Error'
      );
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRandomArticles', () => {
    it('should fetch multiple random articles', async () => {
      // Mock the random titles response
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          query: {
            random: [
              { id: 123, title: 'Test Article 1', ns: 0 },
              { id: 456, title: 'Test Article 2', ns: 0 },
            ],
          },
        },
      });

      // Mock the article details response
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          query: {
            pages: {
              '123': {
                pageid: 123,
                ns: 0,
                title: 'Test Article 1',
                extract: 'This is test article 1',
                canonicalurl: 'https://en.wikipedia.org/wiki/Test_Article_1',
              },
              '456': {
                pageid: 456,
                ns: 0,
                title: 'Test Article 2',
                extract: 'This is test article 2',
                canonicalurl: 'https://en.wikipedia.org/wiki/Test_Article_2',
              },
            },
          },
        },
      });

      const articles = await wikipediaService.getRandomArticles(2);

      expect(articles).toHaveLength(2);
      expect(articles[0].title).toBe('Test Article 1');
      expect(articles[1].title).toBe('Test Article 2');
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });

    it('should use cache if available and not expired', async () => {
      // First call to populate cache
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          query: {
            random: [{ id: 123, title: 'Test Article', ns: 0 }],
          },
        },
      });

      mockedAxios.get.mockResolvedValueOnce({
        data: {
          query: {
            pages: {
              '123': {
                pageid: 123,
                ns: 0,
                title: 'Test Article',
                extract: 'This is a test article',
                canonicalurl: 'https://en.wikipedia.org/wiki/Test_Article',
              },
            },
          },
        },
      });

      await wikipediaService.getRandomArticles(1);

      // Reset mocks to check if they get called again
      mockedAxios.get.mockReset();

      // Second call should use cache
      const articles = await wikipediaService.getRandomArticles(1);

      expect(articles).toHaveLength(1);
      expect(articles[0].title).toBe('Test Article');
      // Should not call the API again
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should handle errors and return cached data if available', async () => {
      // First call to populate cache
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          query: {
            random: [{ id: 123, title: 'Test Article', ns: 0 }],
          },
        },
      });

      mockedAxios.get.mockResolvedValueOnce({
        data: {
          query: {
            pages: {
              '123': {
                pageid: 123,
                ns: 0,
                title: 'Test Article',
                extract: 'This is a test article',
                canonicalurl: 'https://en.wikipedia.org/wiki/Test_Article',
              },
            },
          },
        },
      });

      await wikipediaService.getRandomArticles(1);

      // Force cache expiration
      (wikipediaService as WikipediaServiceForTesting).cache.lastFetched = new Date(0);

      // Mock an API error
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      // Should return cached data even though it's expired
      const articles = await wikipediaService.getRandomArticles(1);

      expect(articles).toHaveLength(1);
      expect(articles[0].title).toBe('Test Article');
    });
  });

  describe('clearCache', () => {
    it('should clear the cache', async () => {
      // First call to populate cache
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          query: {
            random: [{ id: 123, title: 'Test Article', ns: 0 }],
          },
        },
      });

      mockedAxios.get.mockResolvedValueOnce({
        data: {
          query: {
            pages: {
              '123': {
                pageid: 123,
                ns: 0,
                title: 'Test Article',
                extract: 'This is a test article',
                canonicalurl: 'https://en.wikipedia.org/wiki/Test_Article',
              },
            },
          },
        },
      });

      await wikipediaService.getRandomArticles(1);

      // Clear the cache
      wikipediaService.clearCache();

      // Should be empty now
      expect((wikipediaService as WikipediaServiceForTesting).cache.articles).toHaveLength(0);

      // Setup for next API call
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          query: {
            random: [{ id: 456, title: 'New Article', ns: 0 }],
          },
        },
      });

      mockedAxios.get.mockResolvedValueOnce({
        data: {
          query: {
            pages: {
              '456': {
                pageid: 456,
                ns: 0,
                title: 'New Article',
                extract: 'This is a new article',
                canonicalurl: 'https://en.wikipedia.org/wiki/New_Article',
              },
            },
          },
        },
      });

      // Should fetch from API again
      const articles = await wikipediaService.getRandomArticles(1);

      expect(articles).toHaveLength(1);
      expect(articles[0].title).toBe('New Article');
    });
  });
});
