import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the components to simplify testing
vi.mock('../components/Hero', () => ({
  default: () => <div data-testid="hero-component">Hero Component</div>,
}));

vi.mock('../components/BuffaloFacts', () => ({
  default: () => (
    <div data-testid="facts-component">Buffalo Facts Component</div>
  ),
}));

vi.mock('../components/BuffaloQuiz', () => ({
  default: () => <div data-testid="quiz-component">Buffalo Quiz Component</div>,
}));

vi.mock('../components/BuffaloGallery', () => ({
  default: () => (
    <div data-testid="gallery-component">Buffalo Gallery Component</div>
  ),
}));

vi.mock('../components/Footer', () => ({
  default: () => <div data-testid="footer-component">Footer Component</div>,
}));

vi.mock('../components/Background', () => ({
  default: () => (
    <div data-testid="background-component">Background Component</div>
  ),
}));

describe('App Component', () => {
  it('renders all buffalo website components correctly', () => {
    render(<App />);

    // Check if all components are rendered
    expect(screen.getByTestId('hero-component')).toBeInTheDocument();
    expect(screen.getByTestId('facts-component')).toBeInTheDocument();
    expect(screen.getByTestId('quiz-component')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
    expect(screen.getByTestId('background-component')).toBeInTheDocument();

    // Check for conservation section
    expect(screen.getByText('Buffalo Conservation')).toBeInTheDocument();
    expect(screen.getByText(/Once nearly extinct/)).toBeInTheDocument();
  });
});
