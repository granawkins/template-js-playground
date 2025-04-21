import React, { useState, useEffect } from 'react';
import ArticleViewer from './ArticleViewer';
import Background from '../Background';

interface WiktokAppProps {
  showBackground?: boolean;
  onExit?: () => void; // Callback to exit Wiktok and return to main app
}

const WiktokApp: React.FC<WiktokAppProps> = ({ 
  showBackground = true,
  onExit
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Check if this is the first visit and show tutorial automatically
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('wiktok_tutorial_seen');
    if (!hasSeenTutorial) {
      // Show tutorial after a short delay to let the UI load
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Handle tutorial completion
  const handleTutorialComplete = () => {
    localStorage.setItem('wiktok_tutorial_seen', 'true');
    setShowTutorial(false);
  };
  
  // Handle the exit function with both props and ESC key
  const handleExit = () => {
    if (onExit) {
      onExit();
    }
  };
  
  return (
    <div className="wiktok-app">
      {showBackground && <Background />}
      
      <header className="wiktok-header">
        <div className="wiktok-logo">Wiktok</div>
        <div className="wiktok-controls">
          <button 
            className="info-button"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="Show information"
          >
            ℹ️
          </button>
          {onExit && (
            <button
              className="exit-button"
              onClick={handleExit}
              aria-label="Return to home page"
            >
              🏠
            </button>
          )}
        </div>
      </header>
      
      {/* Tutorial overlay for first-time users */}
      {showTutorial && (
        <div className="wiktok-tutorial-overlay">
          <div className="wiktok-tutorial-content">
            <h2>Welcome to Wiktok!</h2>
            <div className="tutorial-steps">
              <div className="tutorial-step">
                <div className="tutorial-icon">👆</div>
                <p>Scroll up and down to browse through Wikipedia articles</p>
              </div>
              <div className="tutorial-step">
                <div className="tutorial-icon">🖼️</div>
                <p>Tap images to zoom in and get a better view</p>
              </div>
              <div className="tutorial-step">
                <div className="tutorial-icon">⌨️</div>
                <p>Use arrow keys to navigate between articles</p>
              </div>
              <div className="tutorial-step">
                <div className="tutorial-icon">↩️</div>
                <p>Press Enter to read the full article on Wikipedia</p>
              </div>
            </div>
            <button onClick={handleTutorialComplete} className="tutorial-button">
              Start Exploring
            </button>
          </div>
        </div>
      )}
      
      {/* Info overlay */}
      {showInfo && (
        <div className="wiktok-info-overlay">
          <div className="wiktok-info-content">
            <h2>About Wiktok</h2>
            <p>Wiktok lets you browse Wikipedia articles in a fun, TikTok-style interface.</p>
            <p>Swipe up to see more articles, tap the images to zoom, and click "Read on Wikipedia" to learn more.</p>
            <div className="keyboard-shortcuts">
              <h3>Keyboard Shortcuts</h3>
              <ul>
                <li><kbd>↑</kbd> / <kbd>↓</kbd> - Navigate between articles</li>
                <li><kbd>Enter</kbd> - Open article on Wikipedia</li>
                <li><kbd>Esc</kbd> - Exit Wiktok</li>
              </ul>
            </div>
            <button onClick={() => setShowInfo(false)} className="info-close-button">
              Got it!
            </button>
          </div>
        </div>
      )}
      
      <main className="wiktok-content">
        <ArticleViewer onExit={handleExit} />
      </main>
    </div>
  );
};

export default WiktokApp;
