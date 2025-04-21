import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import ArticleViewer from '../components/wiktok/ArticleViewer';
import * as wikipediaService from '../services/wikipediaService';
import { WikipediaArticle } from '../types/wikipedia';

// Mock the Wikipedia service
vi.mock('../services/wikipediaService');

// Mock Intersection Observer
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

describe('ArticleViewer Component', () => {
  const mockArticles: WikipediaArticle[] = [
    {
      id: 1,
      title: 'Article 1',
      excerpt: 'Excerpt for article 1',
      thumbnailUrl: 'https://example.com/thumb1.jpg',
      fullImageUrl: 'https://example.com/image1.jpg',
      url: 'https://en.wikipedia.org/wiki/Article_1',
      fetchedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Article 2',
      excerpt: 'Excerpt for article 2',
      thumbnailUrl: 'https://example.com/thumb2.jpg',
      fullImageUrl: 'https://example.com/image2.jpg',
      url: 'https://en.wikipedia.org/wiki/Article_2',
      fetchedAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock the fetchRandomArticles function to return our mock articles
    vi.mocked(wikipediaService.fetchRandomArticles).mockResolvedValue(mockArticles);
  });

  it('fetches and displays articles on mount', async () => {
    // Create a promise that we can control to better test loading states
    let resolveArticles: (value: WikipediaArticle[]) => void;
    const articlesPromise = new Promise<WikipediaArticle[]>(resolve => {
      resolveArticles = resolve;
    });

    // Make the mock not resolve immediately
    vi.mocked(wikipediaService.fetchRandomArticles).mockReturnValueOnce(articlesPromise);
    
    await act(async () => {
      render(<ArticleViewer />);
    });
    
    // Now we can check for the loading indicator while the promise is still pending
    expect(screen.getByText('Loading articles...')).toBeInTheDocument();
    
    // Resolve the promise to let the component load articles
    await act(async () => {
      resolveArticles(mockArticles);
    });
    
    // After loading, articles should be displayed
    await waitFor(() => {
      expect(screen.getByText('Article 1')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Excerpt for article 1')).toBeInTheDocument();
    expect(screen.getByText('Article 2')).toBeInTheDocument();
    
    // Check that the service was called with the initial articles count
    expect(wikipediaService.fetchRandomArticles).toHaveBeenCalledWith(5);
  });

  it('handles API errors gracefully', async () => {
    // Mock an API error
    vi.mocked(wikipediaService.fetchRandomArticles).mockRejectedValueOnce(
      new Error('API Error')
    );
    
    await act(async () => {
      render(<ArticleViewer />);
    });
    
    // Should show error message after loading fails
    await waitFor(() => {
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    expect(screen.getByText('API Error')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('allows retrying after error', async () => {
    // First call fails, second call succeeds
    vi.mocked(wikipediaService.fetchRandomArticles)
      .mockRejectedValueOnce(new Error('API Error'))
      .mockResolvedValueOnce(mockArticles);
    
    await act(async () => {
      render(<ArticleViewer />);
    });
    
    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Click retry button wrapped in act
    await act(async () => {
      fireEvent.click(screen.getByText('Try Again'));
    });
    
    // Should load articles after retry
    await waitFor(() => {
      expect(screen.getByText('Article 1')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // The service should have been called twice (initial failure and retry)
    expect(wikipediaService.fetchRandomArticles).toHaveBeenCalledTimes(2);
  });

  // This test simulates infinite scrolling by triggering the intersection observer callback
  it('loads more articles when scrolling down', async () => {
    // First call returns initial articles, second call returns more articles
    const moreArticles: WikipediaArticle[] = [
      {
        id: 3,
        title: 'Article 3',
        excerpt: 'Excerpt for article 3',
        thumbnailUrl: 'https://example.com/thumb3.jpg',
        fullImageUrl: 'https://example.com/image3.jpg',
        url: 'https://en.wikipedia.org/wiki/Article_3',
        fetchedAt: new Date().toISOString(),
      },
    ];
    
    vi.mocked(wikipediaService.fetchRandomArticles)
      .mockResolvedValueOnce(mockArticles)
      .mockResolvedValueOnce(moreArticles);
    
    await act(async () => {
      render(<ArticleViewer />);
    });
    
    // Wait for initial articles to load
    await waitFor(() => {
      expect(screen.getByText('Article 1')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Simulate intersection observer callback wrapped in act
    await act(async () => {
      const [observerCallback] = mockIntersectionObserver.mock.calls[0];
      observerCallback([{ isIntersecting: true }]);
    });
    
    // Wait for more articles to load
    await waitFor(() => {
      expect(screen.getByText('Article 3')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Should have called the service twice (initial load and infinite scroll)
    expect(wikipediaService.fetchRandomArticles).toHaveBeenCalledTimes(2);
  });
});
