/**
 * Type definitions for Wikipedia API responses and formatted data
 */

// Wikipedia API response interfaces
export interface WikipediaApiResponse {
  query: {
    random: WikipediaRandomEntry[];
    pages: Record<string, WikipediaPage>;
  };
}

export interface WikipediaRandomEntry {
  id: number;
  title: string;
  ns: number;
}

export interface WikipediaPage {
  pageid: number;
  ns: number;
  title: string;
  extract?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  originalimage?: {
    source: string;
    width: number;
    height: number;
  };
  fullurl?: string;
  editurl?: string;
  canonicalurl?: string;
}

// Our formatted data interfaces for frontend consumption
export interface WikipediaArticle {
  id: number;
  title: string;
  excerpt: string;
  thumbnailUrl: string | null;
  fullImageUrl: string | null;
  url: string;
  fetchedAt: Date;
}

// Cache interface
export interface WikipediaCache {
  articles: WikipediaArticle[];
  lastFetched: Date;
}
