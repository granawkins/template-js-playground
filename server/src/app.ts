import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { getRandomJoke, getRandomJokeByCategory } from './data/jokes';

export const app = express();
export const PORT = process.env.PORT || 5000;
export const CLIENT_DIST_PATH = path.join(__dirname, '../../client/dist');

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON bodies
app.use(express.static(CLIENT_DIST_PATH)); // Serve static files from client/dist

// Basic route
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Mentat API!' });
});

// Jokes API routes
app.get('/api/jokes/random', (req: Request, res: Response) => {
  const joke = getRandomJoke();
  res.json({ joke });
});

app.get('/api/jokes/category/:category', (req: Request, res: Response) => {
  const { category } = req.params;

  if (
    category !== 'programming' &&
    category !== 'general' &&
    category !== 'dad'
  ) {
    return res.status(400).json({
      error:
        'Invalid category. Available categories: programming, general, dad',
    });
  }

  const joke = getRandomJokeByCategory(category);

  if (!joke) {
    return res.status(404).json({ error: 'No jokes found for this category' });
  }

  res.json({ joke });
});

// Serve React app
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(CLIENT_DIST_PATH, 'index.html'));
});
