import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

export const app = express();
export const PORT = process.env.PORT || 5000;
export const CLIENT_DIST_PATH = path.join(__dirname, '../../client/dist');

// Buffalo facts array
const buffaloFacts = [
  'The American bison is the largest land mammal in North America, with males weighing up to 2,000 pounds.',
  'Buffalo can run at speeds up to 35 mph and jump up to 6 feet vertically.',
  'Despite their massive size, bison are excellent swimmers.',
  'Buffalo have poor eyesight but exceptional senses of smell and hearing.',
  "A buffalo's hump is comprised of muscle, supported by long vertebrae, and allows them to plow through snow with their heads.",
  'Buffalo can live up to 20-25 years in the wild.',
  'Female bison (cows) typically give birth to one calf after a 9-month pregnancy.',
  'Yellowstone National Park is home to one of the oldest and largest public bison herds in the United States.',
  'Buffalo communicate using a variety of grunts, snorts, and bellows.',
  'Plains Indians used nearly every part of the buffalo – meat for food, hides for tipis, bones for tools, and horns for utensils.',
];

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON bodies
app.use(express.static(CLIENT_DIST_PATH)); // Serve static files from client/dist

// API route for buffalo facts
app.get('/api', (req: Request, res: Response) => {
  // Return a random buffalo fact
  const randomFact =
    buffaloFacts[Math.floor(Math.random() * buffaloFacts.length)];
  res.json({ message: randomFact });
});

// Serve React app
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(CLIENT_DIST_PATH, 'index.html'));
});
