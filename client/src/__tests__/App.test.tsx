import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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

describe('Buffalo Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation
    (globalThis.fetch as unknown as Mock).mockResolvedValue(
      mockFetchResponse({ message: 'Test Message from API' })
    );
  });

  it('renders Buffalo page content correctly', () => {
    render(<App />);
    expect(
      screen.getByText('The Majestic American Buffalo')
    ).toBeInTheDocument();
    expect(
      screen.getByText('A Symbol of North American Wilderness')
    ).toBeInTheDocument();
    expect(screen.getByAltText('American Buffalo (Bison)')).toBeInTheDocument();
    expect(screen.getByText('Historical Significance')).toBeInTheDocument();
    expect(screen.getByText('Conservation Success')).toBeInTheDocument();

    // Buffalo facts section should be present (specific facts rotate, so we check for the heading)
    expect(screen.getByText('Did You Know?')).toBeInTheDocument();
  });

  it('loads and displays API message', async () => {
    render(<App />);

    // Should initially show loading message
    expect(screen.getByText(/Connecting to server/)).toBeInTheDocument();

    // Wait for the fetch to resolve and check if the message is displayed
    await waitFor(() => {
      expect(screen.getByText('Test Message from API')).toBeInTheDocument();
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
