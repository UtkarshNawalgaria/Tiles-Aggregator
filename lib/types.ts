export interface TileProduct {
  id: string;
  name: string;
  brand: string;
  retailer: string;
  retailerLogo?: string;
  price: number;
  priceUnit: 'sqft' | 'piece' | 'box';
  priceDisplay: string;
  size: string;       // e.g. "12x24 in"
  material: string;   // Porcelain | Ceramic | Natural Stone | Glass | Mosaic
  finish: string;     // Matte | Polished | Satin | Textured | Glossy
  color: string;      // White | Gray | Beige | Blue | Black | Brown | Green | Multi
  imageUrl: string;
  productUrl: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  description?: string;
  coverage?: string;  // "15.6 sq ft per box"
  thickness?: string; // "3/8 in"
}

export interface SearchFilters {
  material?: string[];
  size?: string[];
  finish?: string[];
  color?: string[];
  retailer?: string[];
  priceMin?: number;
  priceMax?: number;
  inStockOnly?: boolean;
}

export interface SearchResponse {
  products: TileProduct[];
  totalCount: number;
  sources: string[];
  query: string;
  usingDemo: boolean;
}
