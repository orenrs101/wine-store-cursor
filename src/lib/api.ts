import { Wine } from '../types/wine';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com' 
  : '';

export async function fetchWines(): Promise<Wine[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/wines`);
    if (!response.ok) {
      throw new Error('Failed to fetch wines');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching wines:', error);
    throw error;
  }
}

export async function fetchWineById(id: string): Promise<Wine | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/wines/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch wine');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching wine:', error);
    throw error;
  }
} 