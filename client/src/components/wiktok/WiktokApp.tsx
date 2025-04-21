import React, { useState } from 'react';
import ArticleViewer from './ArticleViewer';
import Background from '../Background';

interface WiktokAppProps {
  showBackground?: boolean;
}

const WiktokApp: React.FC<WiktokAppProps> = ({ showBackground = true }) => {
  const [showInfo, setShowInfo] = useState(false);
  
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
        </div>
      </header>
      
      {showInfo && (
        <div className="wiktok-info-overlay">
          <div className="wiktok-info-content">
            <h2>About Wiktok</h2>
            <p>Wiktok lets you browse Wikipedia articles in a fun, TikTok-style interface.</p>
            <p>Swipe up to see more articles, tap the images to zoom, and click "Read on Wikipedia" to learn more.</p>
            <button onClick={() => setShowInfo(false)}>Got it!</button>
          </div>
        </div>
      )}
      
      <main className="wiktok-content">
        <ArticleViewer />
      </main>
    </div>
  );
};

export default WiktokApp;
