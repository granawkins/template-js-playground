import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

// Define types
type ApiResponse = {
  message: string;
};

// Mock the fetch API
globalThis.fetch = vi.fn() as unknown as typeof fetch;

// Mock the components to avoid issues with background images and testing
vi.mock('../components/Background', () => ({
  default: () => <div data-testid="background-component"></div>,
}));

function mockFetchResponse(data: ApiResponse) {
  return {
    json: vi.fn().mockResolvedValue(data),
    ok: true,
  };
}

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation for buffalo fact
    (globalThis.fetch as unknown as Mock).mockResolvedValue(
      mockFetchResponse({ message: 'Test Buffalo Fact' })
    );
  });

  it('renders Buffalo website components correctly', () => {
    render(<App />);
    expect(screen.getByText('American Bison')).toBeInTheDocument();
    expect(
      screen.getByText("North America's largest land mammal")
    ).toBeInTheDocument();
    expect(screen.getByText('About Buffalo')).toBeInTheDocument();
    expect(screen.getByText('Conservation Status')).toBeInTheDocument();
    expect(screen.getByText('Historical Significance')).toBeInTheDocument();
    expect(
      screen.getByText(/American Bison Educational Website/)
    ).toBeInTheDocument();
  });

  it('loads and displays buffalo fact from API', async () => {
    render(<App />);

    // Should initially show loading message
    expect(screen.getByText(/Loading fact about buffalo/)).toBeInTheDocument();

    // Wait for the fetch to resolve and check if the buffalo fact is displayed
    await waitFor(() => {
      expect(screen.getByText(/Test Buffalo Fact/)).toBeInTheDocument();
    });

    expect(globalThis.fetch).toHaveBeenCalledWith('/api');
  });

  it('handles API error', async () => {
    // Mock a failed API call
    (globalThis.fetch as unknown as Mock).mockRejectedValue(
      new Error('API Error')
    );

    render(<App />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error: API Error/)).toBeInTheDocument();
    });
  });
});
