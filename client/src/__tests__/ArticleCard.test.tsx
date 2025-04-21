import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArticleCard from '../components/wiktok/ArticleCard';
import { WikipediaArticle } from '../types/wikipedia';

describe('ArticleCard Component', () => {
  const mockArticle: WikipediaArticle = {
    id: 123,
    title: 'Test Article',
    excerpt: 'This is a test article excerpt for testing the ArticleCard component.',
    thumbnailUrl: 'https://example.com/thumbnail.jpg',
    fullImageUrl: 'https://example.com/image.jpg',
    url: 'https://en.wikipedia.org/wiki/Test_Article',
    fetchedAt: new Date().toISOString(),
  };

  const mockArticleNoImage: WikipediaArticle = {
    id: 456,
    title: 'No Image Article',
    excerpt: 'This article has no image.',
    thumbnailUrl: null,
    fullImageUrl: null,
    url: 'https://en.wikipedia.org/wiki/No_Image_Article',
    fetchedAt: new Date().toISOString(),
  };

  it('renders article with title and excerpt', () => {
    render(<ArticleCard article={mockArticle} isActive={true} />);
    
    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('This is a test article excerpt for testing the ArticleCard component.')).toBeInTheDocument();
  });

  it('renders image when available', () => {
    render(<ArticleCard article={mockArticle} isActive={true} />);
    
    const image = screen.getByAltText('Test Article');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders placeholder when no image is available', () => {
    render(<ArticleCard article={mockArticleNoImage} isActive={true} />);
    
    expect(screen.getByText('No Image Available')).toBeInTheDocument();
  });

  it('has a link to the Wikipedia article', () => {
    render(<ArticleCard article={mockArticle} isActive={true} />);
    
    const link = screen.getByText('Read on Wikipedia');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Test_Article');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('calls onActive callback when active', () => {
    const mockOnActive = vi.fn();
    
    render(
      <ArticleCard 
        article={mockArticle} 
        isActive={true} 
        onActive={mockOnActive} 
      />
    );
    
    // The onActive callback should be called on mount if isActive is true
    expect(mockOnActive).toHaveBeenCalledTimes(1);
  });

  it('does not call onActive callback when not active', () => {
    const mockOnActive = vi.fn();
    
    render(
      <ArticleCard 
        article={mockArticle} 
        isActive={false} 
        onActive={mockOnActive} 
      />
    );
    
    // The onActive callback should not be called if isActive is false
    expect(mockOnActive).not.toHaveBeenCalled();
  });
});
