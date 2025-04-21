import axios from 'axios';
import {
  WikipediaApiResponse,
  WikipediaArticle,
  WikipediaCache,
} from '../types/wikipedia';

class WikipediaService {
  private cache: WikipediaCache = {
    articles: [],
    lastFetched: new Date(0), // Initialize with epoch timestamp
  };

  private readonly cacheExpirationMs: number = 30 * 60 * 1000; // 30 minutes
  private readonly apiBaseUrl: string =
    'https://en.wikipedia.org/api/rest_v1/page/random/summary';
  private readonly apiMwBaseUrl: string = 'https://en.wikipedia.org/w/api.php';

  /**
   * Fetch a batch of random articles from Wikipedia
   * @param count Number of random articles to fetch
   * @returns An array of formatted Wikipedia articles
   */
  public async getRandomArticles(
    count: number = 5
  ): Promise<WikipediaArticle[]> {
    // Check if cache is still valid
    if (this.isCacheValid() && this.cache.articles.length >= count) {
      console.log('Using cached Wikipedia articles');
      return this.cache.articles.slice(0, count);
    }

    try {
      console.log(`Fetching ${count} random articles from Wikipedia`);
      // Fetch random article titles
      const randomTitles = await this.fetchRandomTitles(count);

      // Fetch full details for each article
      const articles = await this.fetchArticleDetails(randomTitles);

      // Update cache
      this.cache = {
        articles,
        lastFetched: new Date(),
      };

      return articles;
    } catch (error) {
      this.handleError('Error fetching random articles', error);
      // Return cached data if available (even if expired), otherwise throw
      if (this.cache.articles.length > 0) {
        console.log('Using expired cache due to API error');
        return this.cache.articles.slice(0, count);
      }
      throw error;
    }
  }

  /**
   * Fetch a single random article from Wikipedia
   * @returns A formatted Wikipedia article
   */
  public async getRandomArticle(): Promise<WikipediaArticle> {
    try {
      const articles = await this.getRandomArticles(1);
      return articles[0];
    } catch (error) {
      this.handleError('Error fetching random article', error);
      throw error;
    }
  }

  /**
   * Clear the service cache
   */
  public clearCache(): void {
    this.cache = {
      articles: [],
      lastFetched: new Date(0),
    };
    console.log('Wikipedia cache cleared');
  }

  /**
   * Check if the cache is still valid
   * @returns boolean indicating if cache is valid
   */
  private isCacheValid(): boolean {
    const now = new Date();
    const cacheAge = now.getTime() - this.cache.lastFetched.getTime();
    return cacheAge < this.cacheExpirationMs && this.cache.articles.length > 0;
  }

  /**
   * Fetch random article titles from Wikipedia API
   * @param count Number of random titles to fetch
   * @returns Array of Wikipedia random entry objects
   */
  private async fetchRandomTitles(count: number): Promise<string[]> {
    try {
      const params = {
        action: 'query',
        format: 'json',
        list: 'random',
        rnnamespace: 0, // Only articles in the main namespace
        rnlimit: count,
        origin: '*',
      };

      const response = await axios.get<WikipediaApiResponse>(
        this.apiMwBaseUrl,
        { params }
      );
      return response.data.query.random.map((entry) => entry.title);
    } catch (error) {
      this.handleError('Error fetching random titles', error);
      throw error;
    }
  }

  /**
   * Fetch full article details for a list of titles
   * @param titles Array of article titles
   * @returns Array of formatted Wikipedia articles
   */
  private async fetchArticleDetails(
    titles: string[]
  ): Promise<WikipediaArticle[]> {
    if (titles.length === 0) {
      return [];
    }

    try {
      // Build a titles string for the API
      const titlesParam = titles.join('|');

      const params = {
        action: 'query',
        format: 'json',
        prop: 'extracts|pageimages|info',
        exintro: 'true', // Only get the intro paragraph
        exchars: '300', // Limit extract length
        explaintext: 'true', // Return plain text, not HTML
        piprop: 'thumbnail|original', // Get thumbnail and original image
        pithumbsize: 500, // Thumbnail size
        pilimit: titles.length,
        inprop: 'url', // Get page URLs
        titles: titlesParam,
        origin: '*',
      };

      const response = await axios.get<WikipediaApiResponse>(
        this.apiMwBaseUrl,
        { params }
      );

      // Map the response to our article format
      const articles: WikipediaArticle[] = [];

      if (response.data.query && response.data.query.pages) {
        for (const pageId in response.data.query.pages) {
          const page = response.data.query.pages[pageId];

          articles.push({
            id: page.pageid,
            title: page.title,
            excerpt: page.extract || 'No excerpt available',
            thumbnailUrl: page.thumbnail ? page.thumbnail.source : null,
            fullImageUrl: page.originalimage ? page.originalimage.source : null,
            url:
              page.canonicalurl ||
              `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
            fetchedAt: new Date(),
          });
        }
      }

      return articles;
    } catch (error) {
      this.handleError('Error fetching article details', error);
      throw error;
    }
  }

  /**
   * Handle errors from API calls
   * @param message Error context message
   * @param error The caught error
   */
  private handleError(message: string, error: any): void {
    console.error(`${message}:`, error);
    if (axios.isAxiosError(error)) {
      console.error('API error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
  }
}

export default new WikipediaService();
