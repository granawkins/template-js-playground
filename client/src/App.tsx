import { useState, useEffect } from 'react';
import mentatLogo from '/mentat.png';
import Background from './components/Background';

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

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

    // Update clock every second (classic Windows feature)
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  // Format time in classic Windows format (HH:MM AM/PM)
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <Background />

      {/* Main Window */}
      <div
        className="window"
        style={{ maxWidth: '640px', margin: '20px auto' }}
      >
        {/* Window Title Bar */}
        <div className="window-title">
          <div className="window-title-text">
            <span style={{ marginRight: '5px' }}>🖥️</span>
            Mentat.exe
          </div>
          <div className="window-title-buttons">
            <div className="window-title-button">_</div>
            <div className="window-title-button">□</div>
            <div className="window-title-button">✕</div>
          </div>
        </div>

        {/* Window Content */}
        <div className="window-content">
          {/* Header with Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '15px',
            }}
          >
            <a href="https://mentat.ai" target="_blank" rel="noreferrer">
              <img src={mentatLogo} className="logo" alt="Mentat logo" />
            </a>
            <div style={{ marginLeft: '15px' }}>
              <h1
                className="pixel-text"
                style={{ fontSize: '20px', color: '#000080' }}
              >
                Mentat Template JS
              </h1>
              <div style={{ fontSize: '14px', marginTop: '5px' }}>
                v1.0.0 © 2025 AbanteAI
              </div>
            </div>
          </div>

          {/* Features Panel */}
          <div className="inset-panel">
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              System Configuration:
            </div>
            <ul className="features">
              <li>Frontend: React, Vite, Vitest</li>
              <li>Backend: Node.js, Express, Jest</li>
              <li>Utilities: Typescript, ESLint, Prettier</li>
            </ul>
          </div>

          {/* Server Message Panel */}
          <div className="inset-panel">
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              Server Status:
            </div>
            <div style={{ fontFamily: 'VT323, monospace', fontSize: '18px' }}>
              {loading ? (
                <span>
                  Loading message from server
                  <span className="loading-animation">...</span>
                </span>
              ) : error ? (
                <span style={{ color: 'red' }}>ERROR: {error}</span>
              ) : message ? (
                <span>{message}</span>
              ) : (
                <span>No message from server</span>
              )}
            </div>
          </div>

          {/* Action Panel */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '15px',
            }}
          >
            <button className="retro-button">Help</button>
            <div>
              <button
                className="retro-button"
                onClick={() => window.location.reload()}
              >
                Refresh
              </button>
              <button
                className="retro-button"
                onClick={() =>
                  window.open(
                    'https://github.com/granawkins/template-js-playground/issues',
                    '_blank'
                  )
                }
              >
                GitHub
              </button>
            </div>
          </div>

          {/* Status Bar */}
          <div
            style={{
              marginTop: '15px',
              border: '2px solid',
              borderColor: '#808080 #ffffff #ffffff #808080',
              padding: '2px 5px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
            }}
          >
            <div>
              Ready: Create a new GitHub issue and tag '@MentatBot' to get
              started.
            </div>
            <div>{formattedTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
