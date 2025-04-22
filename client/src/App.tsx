import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import BuffaloFacts from './components/BuffaloFacts';
import HabitatSection from './components/HabitatSection';
import TriviaSection from './components/TriviaSection';
import Background from './components/Background';
import './buffalo-styles.css';

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBackendMessage = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api');

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBackendMessage();
  }, []);

  return (
    <div className="buffalo-app">
      <Background />

      <div className="buffalo-content">
        <HeroSection />

        <BuffaloFacts />

        <HabitatSection />

        <TriviaSection />

        <div className="server-message">
          <h3>Message from the Buffalo Server</h3>
          <p>
            {loading
              ? 'The buffalo are gathering your message...'
              : error
                ? `Error: ${error}`
                : message
                  ? `🦬 ${message} 🦬`
                  : 'No message from the buffalo server'}
          </p>
        </div>

        <footer className="buffalo-footer">
          <p>Made with ❤️ by Buffalo Enthusiasts</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
