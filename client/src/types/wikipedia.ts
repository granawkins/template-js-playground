/**
 * Type definitions for Wikipedia data used in the frontend
 */

export interface WikipediaArticle {
  id: number;
  title: string;
  excerpt: string;
  thumbnailUrl: string | null;
  fullImageUrl: string | null;
  url: string;
  fetchedAt: string;
}
