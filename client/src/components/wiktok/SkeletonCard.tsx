import React from 'react';

/**
 * Skeleton loading placeholder for ArticleCard
 * Displays an animated loading state while articles are being fetched
 */
const SkeletonCard: React.FC = () => {
  return (
    <div className="article-card skeleton-card">
      <div className="article-content">
        <div className="skeleton-title-container">
          <div className="skeleton-title skeleton-animate"></div>
          <div className="skeleton-title skeleton-animate" style={{ width: '70%' }}></div>
        </div>
        
        <div className="article-image-container skeleton-image-container">
          <div className="skeleton-image skeleton-animate"></div>
        </div>
        
        <div className="skeleton-excerpt-container">
          <div className="skeleton-text skeleton-animate"></div>
          <div className="skeleton-text skeleton-animate"></div>
          <div className="skeleton-text skeleton-animate" style={{ width: '80%' }}></div>
        </div>
        
        <div className="article-actions">
          <div className="skeleton-button skeleton-animate"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
