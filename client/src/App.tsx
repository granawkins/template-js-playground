import { useState, useEffect } from 'react';
import mentatLogo from '/mentat.png';
import Background from './components/Background';
import WiktokApp from './components/wiktok/WiktokApp';

function App() {
  const [showWiktok, setShowWiktok] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check URL parameters for direct access to Wiktok mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'wiktok') {
      setShowWiktok(true);
    }
  }, []);

  // Fetch backend message when in standard view
  useEffect(() => {
    const fetchBackendMessage = async () => {
      if (showWiktok) return; // Skip if Wiktok is shown
      
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
  }, [showWiktok]);

  // Handle switching to Wiktok mode
  const handleShowWiktok = () => {
    setShowWiktok(true);
    // Update URL to reflect state without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('mode', 'wiktok');
    window.history.pushState({}, '', url);
  };

  // Handle exiting Wiktok mode
  const handleExitWiktok = () => {
    setShowWiktok(false);
    // Update URL to reflect state without page reload
    const url = new URL(window.location.href);
    url.searchParams.delete('mode');
    window.history.pushState({}, '', url);
  };

  // Show the Wiktok interface
  if (showWiktok) {
    return <WiktokApp onExit={handleExitWiktok} />;
  }

  // Show the default landing page
  return (
    <div className="landing-page">
      <Background />
      
      <header className="landing-header">
        <a href="https://mentat.ai" target="_blank" rel="noopener noreferrer">
          <img src={mentatLogo} className="logo" alt="Mentat logo" />
        </a>
        <h1>Mentat Template JS</h1>
      </header>
      
      <main className="landing-content">
        <section className="tech-stack">
          <h2>Built with</h2>
          <ul>
            <li>Frontend: React 19, TypeScript, Vite, Vitest</li>
            <li>Backend: Node.js, Express, Jest</li>
            <li>Utilities: TypeScript, ESLint, Prettier</li>
          </ul>
        </section>
        
        <section className="server-message">
          <h2>Server Status</h2>
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
        </section>
        
        <section className="wiktok-promo">
          <h2>Try our Wiktok Feature</h2>
          <p>
            Explore Wikipedia articles in a TikTok-style interface! 
            Swipe through interesting knowledge with our infinite scroll.
          </p>
          <button
            onClick={handleShowWiktok}
            className="wiktok-button"
            aria-label="Open Wiktok application"
          >
            Try Wiktok
          </button>
        </section>
        
        <section className="get-started">
          <h2>Get Started with Mentat</h2>
          <p>Create a new GitHub issue at tag '@MentatBot' to get started.</p>
        </section>
      </main>
      
      <footer className="landing-footer">
        <p>Built with Mentat • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
