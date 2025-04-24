import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JokeCard from '../components/JokeCard';

// Mock fetch API
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe('JokeCard Component', () => {
  // Helper to create mock responses
  function createMockJokeResponse(category: string = 'programming') {
    return {
      ok: true,
      json: () =>
        Promise.resolve({
          joke: {
            id: 1,
            text: 'Test joke text',
            category,
          },
        }),
    };
  }

  beforeEach(() => {
    // Default successful response for initial test
    mockFetch.mockResolvedValue(createMockJokeResponse());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the JokeCard component correctly', () => {
    render(<JokeCard />);

    expect(screen.getByText('Joke Generator')).toBeInTheDocument();
    expect(screen.getByText('New Joke')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays a loading state while fetching a joke', async () => {
    // Create a promise that won't resolve immediately
    let resolvePromise: (value: Response) => void;
    const mockPromise = new Promise<Response>((resolve) => {
      resolvePromise = resolve;
    });

    mockFetch.mockReturnValue(mockPromise);

    render(<JokeCard />);

    // Should show loading state
    expect(screen.getByText('Loading joke...')).toBeInTheDocument();

    // Resolve the promise with a mock response
    resolvePromise!(createMockJokeResponse() as unknown as Response);

    // Wait for the joke to load
    await waitFor(
      () => {
        expect(screen.getByText('Test joke text')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('fetches and displays a joke on initial render', async () => {
    // Specific mock for this test
    mockFetch.mockResolvedValueOnce(createMockJokeResponse());

    render(<JokeCard />);

    // Wait for the joke to load
    await waitFor(
      () => {
        expect(screen.getByText('Test joke text')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    expect(mockFetch).toHaveBeenCalledWith('/api/jokes/random');
  });

  it('fetches a new joke when the "New Joke" button is clicked', async () => {
    // Initial render joke
    mockFetch.mockResolvedValueOnce(createMockJokeResponse());

    render(<JokeCard />);

    // Wait for the initial joke to load
    await waitFor(
      () => {
        expect(screen.getByText('Test joke text')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Set up mock for button click
    mockFetch.mockResolvedValueOnce(createMockJokeResponse('dad'));

    // Click the button
    fireEvent.click(screen.getByText('New Joke'));

    // Verify fetch was called
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/jokes/random');
    });
  });

  it('fetches jokes by category when the dropdown is changed', async () => {
    // Initial render joke
    mockFetch.mockResolvedValueOnce(createMockJokeResponse());

    render(<JokeCard />);

    // Wait for the initial joke to load
    await waitFor(
      () => {
        expect(screen.getByText('Test joke text')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Set up mock for category change
    mockFetch.mockResolvedValueOnce(createMockJokeResponse('dad'));

    // Change the category
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'dad' },
    });

    // Verify fetch was called with the right category
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/jokes/category/dad');
    });
  });

  it('displays an error message when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<JokeCard />);

    // Wait for the error message to appear
    await waitFor(
      () => {
        expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
