export interface Wine {
  id: string; // Database uses string IDs (cuid)
  name: string;
  winery: string;
  price: number;
  image: string;
  type: 'RED' | 'WHITE'; // Enum values from database
  description?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Legacy type for backwards compatibility during migration
export interface LegacyWine {
  id: number;
  name: string;
  winery: string;
  price: number;
  image: string;
  type: 'red' | 'white';
  description?: string;
} 