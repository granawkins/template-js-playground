import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';

// Define types
type ApiResponse = {
  message: string;
};

// Mock the fetch API
globalThis.fetch = vi.fn() as unknown as typeof fetch;

function mockFetchResponse(data: ApiResponse) {
  return {
    json: vi.fn().mockResolvedValue(data),
    ok: true,
  };
}

// Mock the Wikipedia service
vi.mock('../services/wikipediaService', () => ({
  fetchRandomArticles: vi.fn().mockResolvedValue([]),
  fetchRandomArticle: vi.fn().mockResolvedValue({}),
  clearArticleCache: vi.fn().mockResolvedValue({ success: true }),
}));

// Mock Intersection Observer for ArticleViewer
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation
    (globalThis.fetch as unknown as Mock).mockResolvedValue(
      mockFetchResponse({ message: 'Test Message from API' })
    );
  });

  it('renders landing page UI by default', () => {
    render(<App />);
    // Check that landing page header is visible
    expect(screen.getByText('Mentat Template JS')).toBeInTheDocument();
    // Should have a button to switch to Wiktok view
    expect(screen.getByText('Try Wiktok')).toBeInTheDocument();
  });

  it('can switch to Wiktok view and back', async () => {
    render(<App />);
    
    // Initially in landing page view
    expect(screen.getByText('Mentat Template JS')).toBeInTheDocument();
    
    // Switch to Wiktok view
    fireEvent.click(screen.getByText('Try Wiktok'));
    
    // Should now show Wiktok view
    expect(screen.getByText('Wiktok')).toBeInTheDocument();
    // Exit button should be visible
    expect(screen.getByLabelText('Switch to default view')).toBeInTheDocument();
    
    // Switch back to landing page
    fireEvent.click(screen.getByLabelText('Switch to default view'));
    
    // Should be back in landing page view
    expect(screen.getByText('Mentat Template JS')).toBeInTheDocument();
    
    // Should have API call in standard view
    await waitFor(() => {
      expect(screen.getByText('Test Message from API')).toBeInTheDocument();
    });
  });

  it('handles API error in landing page view', async () => {
    // Mock a failed API call
    (globalThis.fetch as unknown as Mock).mockRejectedValue(
      new Error('API Error')
    );

    render(<App />);
    
    // Should be in landing page view by default
    expect(screen.getByText('Mentat Template JS')).toBeInTheDocument();

    // Wait for the error message to appear with more generous timeout and interval
    await waitFor(
      () => {
        expect(screen.getByText(/Error:/)).toBeInTheDocument();
      },
      { timeout: 3000, interval: 100 }
    );
  });
});
