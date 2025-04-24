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

      {/* Header Section */}
      <header className="header">
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <a
            href="https://mentat.ai"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <img
              src={mentatLogo}
              className="logo"
              alt="Mentat logo"
              style={{
                height: '40px',
                width: 'auto',
                margin: 0,
                marginRight: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-primary)',
              }}
            >
              Mentat Template JS
            </span>
          </a>
          <div>
            <a href="#" className="btn">
              Documentation
            </a>
            <a
              href="https://github.com/AbanteAI/mentat-template-js"
              target="_blank"
              className="btn btn-primary"
              style={{ marginLeft: '0.75rem' }}
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Hero Section */}
          <section className="hero-section">
            <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>
              Professional Full-Stack JavaScript Template
            </h1>
            <p
              style={{
                fontSize: '1.2rem',
                maxWidth: '800px',
                margin: '0 auto',
                color: 'var(--color-gray-600)',
                marginBottom: 'var(--space-xl)',
              }}
            >
              A robust foundation for building modern web applications with
              React frontend and Express backend, both using TypeScript.
            </p>
          </section>

          {/* Features Section */}
          <section
            className="section"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div
              className="card features-list"
              style={{ maxWidth: '800px', width: '100%' }}
            >
              <h2 style={{ marginBottom: 'var(--space-lg)' }}>
                Technology Stack
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: 'var(--space-xl)',
                }}
              >
                <div>
                  <h3
                    style={{
                      color: 'var(--color-primary)',
                      fontSize: '1.25rem',
                    }}
                  >
                    Frontend
                  </h3>
                  <ul>
                    <li>React 19</li>
                    <li>TypeScript</li>
                    <li>Vite</li>
                    <li>Vitest</li>
                  </ul>
                </div>
                <div>
                  <h3
                    style={{
                      color: 'var(--color-primary)',
                      fontSize: '1.25rem',
                    }}
                  >
                    Backend
                  </h3>
                  <ul>
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>TypeScript</li>
                    <li>Jest</li>
                  </ul>
                </div>
                <div>
                  <h3
                    style={{
                      color: 'var(--color-primary)',
                      fontSize: '1.25rem',
                    }}
                  >
                    Utilities
                  </h3>
                  <ul>
                    <li>ESLint</li>
                    <li>Prettier</li>
                    <li>Concurrently</li>
                    <li>TypeScript</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Server Status Section */}
          <section
            className="section"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div
              className="card server-message"
              style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}
            >
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Server Status</h3>
              <div
                style={{
                  padding: 'var(--space-md)',
                  backgroundColor: 'var(--color-gray-100)',
                  borderRadius: 'var(--border-radius)',
                }}
              >
                <p style={{ margin: 0, fontSize: '1.1rem' }}>
                  <b>Message from server:</b>{' '}
                  {loading ? (
                    <span>Loading message from server...</span>
                  ) : error ? (
                    <span style={{ color: '#dc3545' }}>Error: {error}</span>
                  ) : message ? (
                    <span style={{ color: 'var(--color-primary)' }}>
                      {message}
                    </span>
                  ) : (
                    <span>No message from server</span>
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <h2 style={{ marginBottom: 'var(--space-lg)' }}>
              Ready to Get Started?
            </h2>
            <p
              style={{
                marginBottom: 'var(--space-xl)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Create a new GitHub issue and tag '@MentatBot' to begin building
              your application.
            </p>
            <a href="#" className="btn btn-accent">
              Create Issue
            </a>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Mentat Template JS | Powered by{' '}
            <a
              href="https://mentat.ai"
              target="_blank"
              style={{ color: 'var(--color-gray-200)' }}
            >
              Mentat
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
