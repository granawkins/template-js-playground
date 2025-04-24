import { useState, useEffect } from 'react';

export interface Joke {
  id: number;
  text: string;
  category: 'programming' | 'general' | 'dad';
}

const JokeCard = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const fetchJoke = async (category: string = 'all') => {
    setLoading(true);
    setError(null);

    try {
      const url =
        category === 'all'
          ? '/api/jokes/random'
          : `/api/jokes/category/${category}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setJoke(data.joke);
    } catch (err) {
      console.error('Error fetching joke:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch joke');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchJoke(category);
  };

  const getCategoryEmoji = (category: string): string => {
    switch (category) {
      case 'programming':
        return '💻';
      case 'general':
        return '😄';
      case 'dad':
        return '👨';
      default:
        return '🃏';
    }
  };

  return (
    <div
      style={{
        marginTop: '20px',
        padding: '20px',
        maxWidth: '400px',
        width: '100%',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      <h2
        style={{
          margin: 0,
          textAlign: 'center',
          fontSize: '1.5rem',
          color: '#333',
        }}
      >
        Joke Generator
      </h2>

      <div
        style={{
          padding: '15px',
          minHeight: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
        }}
      >
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading joke...</p>
        ) : error ? (
          <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
        ) : joke ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '10px', fontSize: '1.1rem' }}>
              {joke.text}
            </p>
            <div
              style={{
                display: 'inline-block',
                padding: '5px 10px',
                borderRadius: '20px',
                backgroundColor: '#e9ecef',
                fontSize: '0.8rem',
              }}
            >
              {getCategoryEmoji(joke.category)} {joke.category}
            </div>
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>No joke loaded</p>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ced4da',
            flex: 1,
          }}
        >
          <option value="all">All Categories</option>
          <option value="programming">Programming</option>
          <option value="general">General</option>
          <option value="dad">Dad Jokes</option>
        </select>

        <button
          onClick={() => fetchJoke(selectedCategory)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          New Joke
        </button>
      </div>
    </div>
  );
};

export default JokeCard;
