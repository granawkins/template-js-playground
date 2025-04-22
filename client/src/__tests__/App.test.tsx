import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

// Mock the buffalo-themed components to simplify testing
vi.mock('../components/HeroSection', () => ({
  default: () => <div data-testid="hero-section">Hero Section Mock</div>,
}));

vi.mock('../components/BuffaloFacts', () => ({
  default: () => <div data-testid="buffalo-facts">Buffalo Facts Mock</div>,
}));

vi.mock('../components/HabitatSection', () => ({
  default: () => <div data-testid="habitat-section">Habitat Section Mock</div>,
}));

vi.mock('../components/TriviaSection', () => ({
  default: () => <div data-testid="trivia-section">Trivia Section Mock</div>,
}));

vi.mock('../components/Background', () => ({
  default: () => <div data-testid="background">Background Mock</div>,
}));

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

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation
    (globalThis.fetch as unknown as Mock).mockResolvedValue(
      mockFetchResponse({ message: 'Test Message from API' })
    );
  });

  it('renders buffalo-themed components correctly', () => {
    render(<App />);

    // Check that all our buffalo components are rendered
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('buffalo-facts')).toBeInTheDocument();
    expect(screen.getByTestId('habitat-section')).toBeInTheDocument();
    expect(screen.getByTestId('trivia-section')).toBeInTheDocument();
    expect(screen.getByTestId('background')).toBeInTheDocument();

    // Check for the footer
    expect(
      screen.getByText(/Made with ❤️ by Buffalo Enthusiasts/)
    ).toBeInTheDocument();
  });

  it('loads and displays API message', async () => {
    render(<App />);

    // Should initially show loading message
    expect(
      screen.getByText(/The buffalo are gathering your message/)
    ).toBeInTheDocument();

    // Wait for the fetch to resolve and check if the message is displayed
    await waitFor(() => {
      expect(
        screen.getByText(/🦬 Test Message from API 🦬/)
      ).toBeInTheDocument();
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
