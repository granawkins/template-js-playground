/**
 * Service for making API calls to the Wikipedia endpoints
 */
import { WikipediaArticle } from '../types/wikipedia';

const API_BASE_URL = '/api/wikipedia';

/**
 * Fetch a single random article from the API
 * @returns A Wikipedia article
 */
export const fetchRandomArticle = async (): Promise<WikipediaArticle> => {
  const response = await fetch(`${API_BASE_URL}/random`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch random article');
  }
  
  return await response.json();
};

/**
 * Fetch multiple random articles from the API
 * @param count Number of articles to fetch (1-20)
 * @returns Array of Wikipedia articles
 */
export const fetchRandomArticles = async (count: number = 5): Promise<WikipediaArticle[]> => {
  // Ensure count is within valid range
  const validCount = Math.min(Math.max(1, count), 20);
  
  const response = await fetch(`${API_BASE_URL}/random-batch?count=${validCount}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch random articles');
  }
  
  return await response.json();
};

/**
 * Clear the server-side cache
 * @returns Success status
 */
export const clearArticleCache = async (): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/clear-cache`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to clear cache');
  }
  
  return await response.json();
};
