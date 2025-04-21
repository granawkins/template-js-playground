import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WikipediaArticle } from '../../types/wikipedia';

interface ArticleCardProps {
  article: WikipediaArticle;
  isActive: boolean; // Whether this card is currently in view/active
  onActive?: () => void; // Callback when the card becomes active
  onOpenArticle?: () => void; // Callback to open article in new tab
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  isActive, 
  onActive,
  onOpenArticle
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  // Focus the button when card becomes active for keyboard navigation
  useEffect(() => {
    if (isActive) {
      // Trigger the onActive callback
      if (onActive) {
        onActive();
      }
      
      // If the card is active, add a slight delay before focusing
      // to allow for smooth scrolling to complete
      const timerId = setTimeout(() => {
        if (buttonRef.current && isActive) {
          // Focus only if the user is using keyboard navigation
          if (document.activeElement?.tagName === 'BODY' || 
              document.activeElement?.classList.contains('article-viewer')) {
            buttonRef.current.focus({ preventScroll: true });
          }
        }
      }, 300);
      
      return () => clearTimeout(timerId);
    }
  }, [isActive, onActive]);

  // Handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true); // Mark as loaded to remove loading state
  };

  // Toggle image zoom on click
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Handle click on the article card (open the article)
  const handleOpenArticle = useCallback(() => {
    if (onOpenArticle) {
      onOpenArticle();
    } else {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  }, [article.url, onOpenArticle]);

  // Handle key press events
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.target === cardRef.current) {
      handleOpenArticle();
    }
  }, [handleOpenArticle]);

  // Truncate excerpt if it's too long
  const truncateExcerpt = (text: string, maxLength: number = 200): string => {
    if (text.length <= maxLength) return text;
    // Try to find the end of a sentence or period near the maxLength
    const periodPosition = text.indexOf('.', maxLength - 30);
    if (periodPosition > 0 && periodPosition < maxLength + 30) {
      return text.substring(0, periodPosition + 1);
    }
    return text.substring(0, maxLength) + '...';
  };

  // Format the publication date if available
  const formatDate = (): string | null => {
    if (!article.fetchedAt) return null;
    
    try {
      const date = new Date(article.fetchedAt);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    } catch {
      return null;
    }
  };

  const formattedDate = formatDate();
  
  return (
    <div 
      ref={cardRef}
      className={`article-card ${isActive ? 'active' : ''}`}
      role="article"
      aria-labelledby={`article-title-${article.id}`}
      tabIndex={isActive ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      <div className="article-content">
        <h2 
          id={`article-title-${article.id}`} 
          className="article-title"
        >
          {article.title}
        </h2>
        
        {formattedDate && (
          <div className="article-date" aria-label="Article fetched date">
            {formattedDate}
          </div>
        )}
        
        <div 
          className={`article-image-container ${isZoomed ? 'zoomed' : ''}`}
          onClick={toggleZoom}
          tabIndex={0}
          role="button"
          aria-label={isZoomed ? "Zoom out image" : "Zoom in image"}
          onKeyDown={(e) => e.key === 'Enter' && toggleZoom()}
        >
          {!imageError && (article.fullImageUrl || article.thumbnailUrl) ? (
            <>
              {!imageLoaded && (
                <div className="image-loading-placeholder">
                  <div className="loading-spinner"></div>
                </div>
              )}
              <img
                src={article.fullImageUrl || article.thumbnailUrl || ''}
                alt={article.title}
                className={`article-image ${imageLoaded ? 'loaded' : ''}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
              {isZoomed && (
                <div className="zoom-out-hint">
                  <span>Tap to zoom out</span>
                </div>
              )}
            </>
          ) : (
            <div className="article-image-placeholder">
              <span>No Image Available</span>
            </div>
          )}
        </div>
        
        <div className="article-excerpt" tabIndex={isActive ? 0 : -1}>
          <p>{truncateExcerpt(article.excerpt)}</p>
        </div>
        
        <div className="article-actions">
          <a 
            ref={buttonRef}
            href={article.url} 
            onClick={(e) => {
              if (onOpenArticle) {
                e.preventDefault();
                onOpenArticle();
              }
            }}
            target="_blank" 
            rel="noopener noreferrer" 
            className="read-more-button"
            aria-label={`Read full article about ${article.title} on Wikipedia`}
          >
            Read on Wikipedia
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
