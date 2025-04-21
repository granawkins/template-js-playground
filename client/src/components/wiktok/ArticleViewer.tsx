import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WikipediaArticle } from '../../types/wikipedia';
import { fetchRandomArticles } from '../../services/wikipediaService';
import ArticleCard from './ArticleCard';
import LoadingIndicator from './LoadingIndicator';
import ErrorDisplay from './ErrorDisplay';

const INITIAL_ARTICLES_COUNT = 5;
const LOAD_MORE_THRESHOLD = 2; // Load more when 2 articles from the end

const ArticleViewer: React.FC = () => {
  const [articles, setArticles] = useState<WikipediaArticle[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const loadingTriggerRef = useRef<HTMLDivElement>(null);

  // Initial articles fetch
  useEffect(() => {
    fetchInitialArticles();
  }, []);

  // Setup intersection observer for infinite scrolling
  useEffect(() => {
    if (!loadingTriggerRef.current) return;

    const options = {
      root: null, // Use viewport as root
      rootMargin: '0px',
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
  }, [isLoading, isLoadingMore, hasMore]);

  // Fetch initial set of articles
  const fetchInitialArticles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchRandomArticles(INITIAL_ARTICLES_COUNT);
      setArticles(data);
      setActiveIndex(0);
      setHasMore(true);
    } catch (err) {
      console.error('Error fetching initial articles:', err);
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  };

  // Load more articles when user scrolls down
  const loadMoreArticles = async () => {
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
          return [...prevArticles, ...newArticles];
        });
      }
    } catch (err) {
      console.error('Error loading more articles:', err);
      setError(err instanceof Error ? err.message : 'Failed to load more articles');
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Retry loading if there was an error
  const handleRetry = () => {
    if (articles.length === 0) {
      fetchInitialArticles();
    } else {
      setError(null);
      loadMoreArticles();
    }
  };

  // Track scroll position to determine active article
  const handleScroll = useCallback(() => {
    if (!viewerRef.current) return;

    const container = viewerRef.current;
    const containerHeight = container.clientHeight;
    const scrollPosition = container.scrollTop;
    
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

    setActiveIndex(bestVisibleIndex);
  }, []);

  // Set up scroll event listener
  useEffect(() => {
    const viewer = viewerRef.current;
    if (viewer) {
      viewer.addEventListener('scroll', handleScroll);
      return () => {
        viewer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  // Show loading indicator if this is the initial load
  if (isLoading && articles.length === 0) {
    return <LoadingIndicator fullScreen />;
  }

  // Show error if there's an issue with the initial load
  if (error && articles.length === 0) {
    return <ErrorDisplay message={error} onRetry={handleRetry} />;
  }

  return (
    <div className="article-viewer" ref={viewerRef}>
      {articles.map((article, index) => (
        <ArticleCard 
          key={`${article.id}-${index}`} 
          article={article} 
          isActive={index === activeIndex}
          onActive={() => setActiveIndex(index)}
        />
      ))}
      
      {/* Loading trigger element for infinite scroll */}
      <div ref={loadingTriggerRef} className="loading-trigger">
        {isLoadingMore && <LoadingIndicator />}
        {error && <ErrorDisplay message={error} onRetry={handleRetry} />}
      </div>

      {!isLoading && !hasMore && articles.length > 0 && (
        <div className="end-message">
          <p>You've reached the end of the feed!</p>
          <button onClick={fetchInitialArticles} className="refresh-button">
            Refresh Feed
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleViewer;
