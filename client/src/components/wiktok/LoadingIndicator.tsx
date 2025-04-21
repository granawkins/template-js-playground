import React from 'react';

interface LoadingIndicatorProps {
  fullScreen?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ fullScreen = false }) => {
  return (
    <div className={`loading-indicator ${fullScreen ? 'full-screen' : ''}`}>
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
      <p>Loading articles...</p>
    </div>
  );
};

export default LoadingIndicator;
