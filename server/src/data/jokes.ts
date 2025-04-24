/**
 * Collection of jokes for the API
 */
export interface Joke {
  id: number;
  text: string;
  category: 'programming' | 'general' | 'dad';
}

export const jokes: Joke[] = [
  {
    id: 1,
    text: 'Why do programmers prefer dark mode? Because light attracts bugs!',
    category: 'programming',
  },
  {
    id: 2,
    text: "Why don't scientists trust atoms? Because they make up everything!",
    category: 'general',
  },
  {
    id: 3,
    text: "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    category: 'programming',
  },
  {
    id: 4,
    text: 'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    category: 'dad',
  },
  {
    id: 5,
    text: "Why do Java developers wear glasses? Because they don't C#!",
    category: 'programming',
  },
  {
    id: 6,
    text: 'What do you call a fake noodle? An impasta!',
    category: 'dad',
  },
  {
    id: 7,
    text: "I'm reading a book on anti-gravity. It's impossible to put down!",
    category: 'general',
  },
  {
    id: 8,
    text: 'Why was the math book sad? Because it had too many problems.',
    category: 'dad',
  },
  {
    id: 9,
    text: 'Why did the developer go broke? Because he used up all his cache!',
    category: 'programming',
  },
  {
    id: 10,
    text: "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
    category: 'dad',
  },
];

/**
 * Returns a random joke from the collection
 */
export function getRandomJoke(): Joke {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  return jokes[randomIndex];
}

/**
 * Returns a random joke from a specific category
 */
export function getRandomJokeByCategory(
  category: Joke['category']
): Joke | null {
  const categoryJokes = jokes.filter((joke) => joke.category === category);

  if (categoryJokes.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * categoryJokes.length);
  return categoryJokes[randomIndex];
}
