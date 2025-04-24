import { useState, useEffect } from 'react';
import mentatLogo from '/mentat.png';
import Background from './components/Background';

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

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
    <div className="app-container">
      <Background />

      <header>
        <div className="logo-container">
          <a
            href="https://mentat.ai"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <img src={mentatLogo} className="logo" alt="Mentat logo" />
            {showTooltip && <div className="tooltip">Visit Mentat.ai</div>}
          </a>
        </div>
      </header>

      <main>
        <div className="hero-section">
          <h1 className="title">Mentat Template JS</h1>
          <p className="subtitle">
            A powerful full-stack starter template with modern technologies
          </p>
        </div>

        <div className="card main-card">
          <div className="tech-stack">
            <div className="stack-section">
              <h2>Tech Stack</h2>
              <div className="stack-categories">
                <div className="stack-category">
                  <h3>Frontend</h3>
                  <ul>
                    <li>React 19</li>
                    <li>TypeScript</li>
                    <li>Vite</li>
                    <li>Vitest</li>
                  </ul>
                </div>

                <div className="stack-category">
                  <h3>Backend</h3>
                  <ul>
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>TypeScript</li>
                    <li>Jest</li>
                  </ul>
                </div>

                <div className="stack-category">
                  <h3>Utilities</h3>
                  <ul>
                    <li>ESLint</li>
                    <li>Prettier</li>
                    <li>Concurrently</li>
                    <li>TypeScript</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="server-status">
            <h3>Server Connection</h3>
            <div className="status-indicator">
              <div
                className={`status-dot ${loading ? 'loading' : error ? 'error' : 'success'}`}
              ></div>
              <p className="status-message">
                {loading ? (
                  <span className="shimmer">
                    Loading message from server...
                  </span>
                ) : error ? (
                  <span className="error-message">{`Error: ${error}`}</span>
                ) : message ? (
                  <span className="success-message">{message}</span>
                ) : (
                  'No message from server'
                )}
              </p>
            </div>
          </div>

          <div className="action-section">
            <h3>Get Started</h3>
            <p>
              Create a new GitHub issue at tag '@MentatBot' to start using this
              template.
            </p>
            <button className="cta-button">Explore Documentation</button>
          </div>
        </div>
      </main>

      <footer>
        <p>
          Powered by{' '}
          <a href="https://mentat.ai" target="_blank" rel="noopener noreferrer">
            Mentat.ai
          </a>
        </p>
      </footer>

      <style jsx>{`
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          padding: 2rem;
          position: relative;
          z-index: 2;
        }

        header {
          display: flex;
          justify-content: center;
          padding: 1rem 0 2rem;
        }

        .logo-container {
          position: relative;
        }

        .tooltip {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--color-card-bg);
          color: var(--color-text);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          white-space: nowrap;
          opacity: 0;
          animation: fadeIn 0.3s forwards;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 3rem;
        }

        .subtitle {
          font-size: 1.2rem;
          color: var(--color-text-secondary);
          margin-bottom: 2rem;
        }

        .main-card {
          width: 100%;
          max-width: 900px;
        }

        .tech-stack {
          margin-bottom: 2rem;
        }

        .stack-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: space-between;
          margin-top: 1.5rem;
        }

        .stack-category {
          flex: 1;
          min-width: 200px;
        }

        .stack-category h3 {
          color: var(--color-secondary);
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .server-status {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-top: 1rem;
        }

        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .status-dot.loading {
          background: var(--color-accent);
          animation: pulse 1.5s infinite;
        }

        .status-dot.error {
          background: #ff3860;
        }

        .status-dot.success {
          background: #00d1b2;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .error-message {
          color: #ff3860;
        }

        .success-message {
          color: #00d1b2;
        }

        .action-section {
          text-align: center;
          margin-top: 2rem;
        }

        .cta-button {
          margin-top: 1rem;
        }

        footer {
          margin-top: 3rem;
          text-align: center;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          padding: 1.5rem 0;
        }

        @media (max-width: 768px) {
          .stack-categories {
            flex-direction: column;
            gap: 1.5rem;
          }

          .app-container {
            padding: 1rem;
          }

          .subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
