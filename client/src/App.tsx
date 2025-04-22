import { useState, useEffect } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import AboutBuffalo from './components/AboutBuffalo';
import ConservationStatus from './components/ConservationStatus';
import HistoricalSignificance from './components/HistoricalSignificance';
import Footer from './components/Footer';

function App() {
  const [fact, setFact] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServerFact = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api');

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        setFact(data.message);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServerFact();
  }, []);

  return (
    <div className="app">
      <Background />

      <Header />

      <main>
        <div className="container">
          <div className="welcome-message">
            {loading ? (
              <p>Loading fact about buffalo...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <p>
                <strong>Buffalo Fact:</strong>{' '}
                {fact ||
                  'Did you know? Buffalo can run up to 35 mph and jump up to 6 feet vertically.'}
              </p>
            )}
          </div>

          <AboutBuffalo />
          <ConservationStatus />
          <HistoricalSignificance />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
