import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WikipediaArticle } from '../../types/wikipedia';
import { fetchRandomArticles } from '../../services/wikipediaService';
import ArticleCard from './ArticleCard';
import LoadingIndicator from './LoadingIndicator';
import ErrorDisplay from './ErrorDisplay';
import SkeletonCard from './SkeletonCard';

const INITIAL_ARTICLES_COUNT = 5;
const LOAD_MORE_THRESHOLD = 2; // Load more when 2 articles from the end

interface ArticleViewerProps {
  onExit?: () => void; // Callback to exit Wiktok view
}

const ArticleViewer: React.FC<ArticleViewerProps> = ({ onExit }) => {
  const [articles, setArticles] = useState<WikipediaArticle[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(true);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const loadingTriggerRef = useRef<HTMLDivElement>(null);
  const articleRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Define callback functions first so they can be used in dependency arrays
  
  // Open the active article on Wikipedia
  const openActiveArticle = useCallback(() => {
    if (articles[activeIndex]) {
      window.open(articles[activeIndex].url, '_blank', 'noopener,noreferrer');
    }
  }, [articles, activeIndex]);

  // Track scroll position to determine active article
  const handleScroll = useCallback(() => {
    if (!viewerRef.current) return;

    const container = viewerRef.current;
    // These variables aren't used but might be useful for future improvements
    // const containerHeight = container.clientHeight;
    // const scrollPosition = container.scrollTop;
    
    // Calculate which article is most visible
    const articleElements = container.querySelectorAll('.article-card');
    let bestVisibleIndex = 0;
    let bestVisibleArea = 0;

    articleElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Calculate how much of the element is visible
      const visibleTop = Math.max(rect.top, containerRect.top);
      const visibleBottom = Math.min(rect.bottom, containerRect.bottom);
      
      if (visibleBottom > visibleTop) {
        const visibleArea = visibleBottom - visibleTop;
        if (visibleArea > bestVisibleArea) {
          bestVisibleArea = visibleArea;
          bestVisibleIndex = index;
        }
      }
    });

    if (bestVisibleIndex !== activeIndex) {
      setActiveIndex(bestVisibleIndex);
    }
  }, [activeIndex]);

  // Load more articles when user scrolls down
  const loadMoreArticles = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const data = await fetchRandomArticles(INITIAL_ARTICLES_COUNT);
      
      // If no more articles returned, mark as no more to load
      if (data.length === 0) {
        setHasMore(false);
      } else {
        // Add new articles to the existing ones, avoiding duplicates by ID
        setArticles(prevArticles => {
          const existingIds = new Set(prevArticles.map(article => article.id));
          const newArticles = data.filter(article => !existingIds.has(article.id));
          
          // Extend the refs array for the new articles
          articleRefs.current = [...articleRefs.current, ...newArticles.map(() => null)];
          
          return [...prevArticles, ...newArticles];
        });
      }
    } catch (err) {
      console.error('Error loading more articles:', err);
      setError(err instanceof Error ? err.message : 'Failed to load more articles');
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore]);

  // Navigate to the previous article
  const navigateToPrevious = useCallback(() => {
    if (activeIndex > 0) {
      const newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
      
      // Scroll to the article
      if (articleRefs.current[newIndex]) {
        articleRefs.current[newIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, [activeIndex]);

  // Navigate to the next article
  const navigateToNext = useCallback(() => {
    if (activeIndex < articles.length - 1) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      
      // Scroll to the article
      if (articleRefs.current[newIndex]) {
        articleRefs.current[newIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      
      // Preload more articles if we're approaching the end
      if (newIndex >= articles.length - LOAD_MORE_THRESHOLD && hasMore && !isLoadingMore) {
        loadMoreArticles();
      }
    }
  }, [activeIndex, articles.length, hasMore, isLoadingMore, loadMoreArticles]);

  // Fetch initial set of articles
  const fetchInitialArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchRandomArticles(INITIAL_ARTICLES_COUNT);
      setArticles(data);
      setActiveIndex(0);
      setHasMore(true);
      
      // Resize the articleRefs array to match the number of articles
      articleRefs.current = data.map(() => null);
    } catch (err) {
      console.error('Error fetching initial articles:', err);
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Retry loading if there was an error
  const handleRetry = useCallback(() => {
    if (articles.length === 0) {
      fetchInitialArticles();
    } else {
      setError(null);
      loadMoreArticles();
    }
  }, [articles.length, fetchInitialArticles, loadMoreArticles]);

  // Initial articles fetch
  useEffect(() => {
    fetchInitialArticles();
    
    // Show the scroll hint for 5 seconds for first-time users
    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [fetchInitialArticles]);

  // Setup keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          navigateToPrevious();
          break;
        case 'ArrowDown':
          e.preventDefault();
          navigateToNext();
          break;
        case 'Enter':
          e.preventDefault();
          openActiveArticle();
          break;
        case 'Escape':
          e.preventDefault();
          if (onExit) onExit();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateToPrevious, navigateToNext, openActiveArticle, onExit]);

  // Setup intersection observer for infinite scrolling
  useEffect(() => {
    if (!loadingTriggerRef.current) return;

    const options = {
      root: null, // Use viewport as root
      rootMargin: '100px',
      threshold: 0.1, // Trigger when at least 10% visible
    };

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading && !isLoadingMore && hasMore) {
        loadMoreArticles();
      }
    }, options);

    observerRef.current.observe(loadingTriggerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, isLoadingMore, hasMore, loadMoreArticles]);

  // Set up scroll event listeners
  useEffect(() => {
    const viewer = viewerRef.current;
    if (viewer) {
      viewer.addEventListener('scroll', handleScroll);
      return () => {
        viewer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  // Show loading indicator with skeleton cards if this is the initial load
  if (isLoading && articles.length === 0) {
    return (
      <div className="article-viewer" aria-busy="true" aria-live="polite">
        <LoadingIndicator fullScreen />
        <div className="skeleton-container">
          {Array.from({ length: 2 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Show error if there's an issue with the initial load
  if (error && articles.length === 0) {
    return <ErrorDisplay message={error} onRetry={handleRetry} />;
  }

  return (
    <div 
      className="article-viewer" 
      ref={viewerRef}
      aria-live="polite"
      role="region"
      aria-label="Wikipedia article feed"
      tabIndex={0}
    >
      {/* First-time user scroll hint */}
      {showScrollHint && articles.length > 0 && (
        <div className="scroll-hint">
          <div className="scroll-hint-animation">
            <span>↓</span>
          </div>
          <p>Scroll down or use arrow keys to navigate</p>
        </div>
      )}

      {articles.map((article, index) => (
        <div
          key={`${article.id}-${index}`}
          ref={el => articleRefs.current[index] = el}
          style={{ scrollSnapAlign: 'start' }}
        >
          <ArticleCard 
            article={article} 
            isActive={index === activeIndex}
            onActive={() => setActiveIndex(index)}
            onOpenArticle={openActiveArticle}
          />
        </div>
      ))}
      
      {/* Loading trigger element for infinite scroll */}
      <div ref={loadingTriggerRef} className="loading-trigger">
        {isLoadingMore && (
          <>
            <LoadingIndicator />
            <div className="skeleton-preview">
              <SkeletonCard />
            </div>
          </>
        )}
        {error && <ErrorDisplay message={error} onRetry={handleRetry} />}
      </div>

      {!isLoading && !hasMore && articles.length > 0 && (
        <div className="end-message">
          <p>You've reached the end of the feed!</p>
          <button 
            onClick={() => fetchInitialArticles()} 
            className="refresh-button"
            aria-label="Refresh feed"
          >
            Refresh Feed
          </button>
        </div>
      )}

      {/* Keyboard navigation hint */}
      <div className="keyboard-hint" aria-hidden="true">
        <div className="key-combo">
          <kbd>↑</kbd><kbd>↓</kbd>
          <span>Navigate</span>
        </div>
        <div className="key-combo">
          <kbd>Enter</kbd>
          <span>Open article</span>
        </div>
        <div className="key-combo">
          <kbd>Esc</kbd>
          <span>Exit</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleViewer;
