import React, { useState, useEffect, useRef } from 'react';
import { WikipediaArticle } from '../../types/wikipedia';

interface ArticleCardProps {
  article: WikipediaArticle;
  isActive: boolean; // Whether this card is currently in view/active
  onActive?: () => void; // Callback when the card becomes active
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, isActive, onActive }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Trigger onActive callback when this card becomes active
  useEffect(() => {
    if (isActive && onActive) {
      onActive();
    }
  }, [isActive, onActive]);

  // Handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Truncate excerpt if it's too long
  const truncateExcerpt = (text: string, maxLength: number = 200): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div 
      ref={cardRef}
      className={`article-card ${isActive ? 'active' : ''}`}
    >
      <div className="article-content">
        <h2 className="article-title">{article.title}</h2>
        
        <div className="article-image-container">
          {(article.fullImageUrl || article.thumbnailUrl) ? (
            <img
              src={article.fullImageUrl || article.thumbnailUrl || ''}
              alt={article.title}
              className={`article-image ${imageLoaded ? 'loaded' : ''}`}
              onLoad={handleImageLoad}
            />
          ) : (
            <div className="article-image-placeholder">
              <span>No Image Available</span>
            </div>
          )}
        </div>
        
        <div className="article-excerpt">
          <p>{truncateExcerpt(article.excerpt)}</p>
        </div>
        
        <div className="article-actions">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="read-more-button"
          >
            Read on Wikipedia
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
