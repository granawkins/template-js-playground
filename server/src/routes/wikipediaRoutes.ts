import express, { Request, Response } from 'express';
import wikipediaService from '../services/wikipediaService';

const router = express.Router();

/**
 * @route GET /api/wikipedia/random
 * @description Get a single random article from Wikipedia
 * @access Public
 */
router.get('/random', async (req: Request, res: Response) => {
  try {
    const article = await wikipediaService.getRandomArticle();
    res.json(article);
  } catch (error) {
    console.error('Error in GET /api/wikipedia/random:', error);
    res.status(500).json({
      error: 'Failed to fetch random Wikipedia article',
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
});

/**
 * @route GET /api/wikipedia/random-batch
 * @description Get multiple random articles from Wikipedia
 * @access Public
 * @param {number} count - Number of articles to fetch (query parameter)
 */
router.get('/random-batch', async (req: Request, res: Response) => {
  const countParam = req.query.count;
  const count = countParam ? parseInt(countParam as string, 10) : 5;

  // Validate count parameter
  if (isNaN(count) || count < 1 || count > 20) {
    return res.status(400).json({
      error: 'Invalid count parameter',
      message: 'Count must be a number between 1 and 20',
    });
  }

  try {
    const articles = await wikipediaService.getRandomArticles(count);
    res.json(articles);
  } catch (error) {
    console.error('Error in GET /api/wikipedia/random-batch:', error);
    res.status(500).json({
      error: 'Failed to fetch random Wikipedia articles',
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
});

/**
 * @route POST /api/wikipedia/clear-cache
 * @description Clear the Wikipedia service cache
 * @access Public
 */
router.post('/clear-cache', (req: Request, res: Response) => {
  try {
    wikipediaService.clearCache();
    res.json({ success: true, message: 'Cache cleared successfully' });
  } catch (error) {
    console.error('Error in POST /api/wikipedia/clear-cache:', error);
    res.status(500).json({
      error: 'Failed to clear cache',
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
});

export default router;
