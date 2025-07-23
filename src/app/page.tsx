'use client'

import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  SimpleGrid,
  VStack,
  Center,
  Alert,
  AlertIcon,
  Flex,
  Spinner
} from '@chakra-ui/react'
import { useState, useMemo, useEffect } from 'react'
import { WineCard } from './components/WineCard'
import { Header } from './components/Header'
import { FilterOptions } from './components/FilterBar'
import { SearchBar } from './components/SearchBar'
import { FilterBar } from './components/FilterBar'
import { fetchWines } from '../lib/api'
import { Wine } from '../types/wine'

// Helper function to normalize text for better Hebrew search
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
};

export default function Home() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    wineType: [],
    wineries: [],
    priceRange: [0, 1000] // Default range, will be updated when wines load
  });

  // Fetch wines from API
  useEffect(() => {
    async function loadWines() {
      try {
        setLoading(true);
        const fetchedWines = await fetchWines();
        setWines(fetchedWines);
        
        // Update price range based on fetched data
        if (fetchedWines.length > 0) {
          const minPrice = Math.min(...fetchedWines.map(wine => wine.price));
          const maxPrice = Math.max(...fetchedWines.map(wine => wine.price));
          setFilters(prev => ({
            ...prev,
            priceRange: [minPrice, maxPrice]
          }));
        }
      } catch (err) {
        setError('Failed to load wines. Please try again later.');
        console.error('Error loading wines:', err);
      } finally {
        setLoading(false);
      }
    }

    loadWines();
  }, []);

  const filteredWines = useMemo(() => {
    // Start with all wines
    let result = wines;
    
    // Apply text search if there is a search term
    if (searchTerm.trim()) {
      const term = normalizeText(searchTerm);
      result = result.filter(wine => 
        normalizeText(wine.name).includes(term) || 
        normalizeText(wine.winery).includes(term)
      );
    }
    
    // Apply wine type filter - convert database enum to filter format
    if (filters.wineType.length > 0) {
      result = result.filter(wine => {
        const wineTypeForFilter = wine.type === 'RED' ? 'red' : 'white';
        return filters.wineType.includes(wineTypeForFilter);
      });
    }
    
    // Apply winery filter
    if (filters.wineries.length > 0) {
      result = result.filter(wine => filters.wineries.includes(wine.winery));
    }
    
    // Apply price range filter
    result = result.filter(wine => 
      wine.price >= filters.priceRange[0] && 
      wine.price <= filters.priceRange[1]
    );
    
    return result;
  }, [wines, searchTerm, filters]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Header />
      <Box width="100%" maxWidth="1600px" mx="auto" py={8}>

        {/* Search and filter section */}
        <Box 
          mb={20}
          px={{ base: 4, md: 6, lg: 8 }}
          width="100%"
        >
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            gap={{ base: 4, md: 4 }}
            align="center"
            justify="space-between"
            width="100%"
          >
            <Box width={{ base: '100%', md: '40%' }}>
              <SearchBar onSearch={handleSearch} />
            </Box>
            
            <Box width={{ base: '100%', md: '58%' }}>
              <FilterBar wines={wines} onFilterChange={handleFilterChange} />
            </Box>
          </Flex>
        </Box>

        <Box px={{ base: 4, md: 6, lg: 8 }} width="100%">
          {loading ? (
            <Center py={20}>
              <Spinner size="xl" color="red.500" />
            </Center>
          ) : error ? (
            <Center py={10}>
              <Alert status="error" borderRadius="md" width="fit-content">
                <AlertIcon />
                {error}
              </Alert>
            </Center>
          ) : filteredWines.length > 0 ? (
            <SimpleGrid 
              columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} 
              spacing={8}
              width="100%"
              justifyContent="center"
            >
              {filteredWines.map((wine) => (
                <WineCard key={wine.id} wine={wine} />
              ))}
            </SimpleGrid>
          ) : (
            <Center py={10}>
              <Alert status="info" borderRadius="md" width="fit-content">
                <AlertIcon />
                לא נמצאו יינות מתאימים לחיפוש
              </Alert>
            </Center>
          )}
        </Box>
      </Box>
    </>
  )
}
