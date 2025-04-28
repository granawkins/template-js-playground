import { useState, useEffect } from 'react';
import mentatLogo from '/mentat.png';
import Background from './components/Background';

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
    <>
      <Background />
      <div className="art-deco-container">
        <header className="art-deco-header">
          <a href="https://mentat.ai" target="_blank">
            <img src={mentatLogo} className="logo" alt="Mentat logo" />
          </a>
          <h1 className="art-deco-title">Mentat Template JS</h1>
          <div className="art-deco-divider"></div>
          <p className="art-deco-subtitle">A Full-Stack JavaScript Template</p>
        </header>

        <ul className="art-deco-feature-list">
          <li>Frontend: React, Vite, Vitest</li>
          <li>Backend: Node.js, Express, Jest</li>
          <li>Utilities: Typescript, ESLint, Prettier</li>
        </ul>

        <div className="art-deco-message">
          <p>
            <b>Message from server:</b>{' '}
            {loading
              ? 'Loading message from server...'
              : error
                ? `Error: ${error}`
                : message
                  ? message
                  : 'No message from server'}
          </p>
        </div>

        <p className="art-deco-footer">
          Create a new GitHub issue at tag '@MentatBot' to get started.
        </p>
      </div>
    </>
  );
}

export default App;
