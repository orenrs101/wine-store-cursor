'use client'

import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Button,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  Stack,
  Wrap,
  WrapItem,
  CheckboxGroup,
  Checkbox,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  HStack,
  Badge,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import { useState, useEffect, useMemo } from 'react'
import { Wine } from '../../types/wine'

// Chevron down icon component
const ChevronDownIcon = (props: any) => (
  <svg 
    stroke="currentColor" 
    fill="currentColor" 
    strokeWidth="0" 
    viewBox="0 0 24 24" 
    height="1em" 
    width="1em" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M16.939 7.939L12 12.879L7.061 7.939L4.939 10.061L12 17.121L19.061 10.061L16.939 7.939Z"></path>
  </svg>
);

interface FilterBarProps {
  wines: Wine[];
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  wineType: string[];
  wineries: string[];
  priceRange: [number, number];
}

export function FilterBar({ wines, onFilterChange }: FilterBarProps) {
  // Get unique wineries from the wine data
  const uniqueWineries = [...new Set(wines.map(wine => wine.winery))];
  
  // Find min and max prices in the wine data
  const minPrice = Math.min(...wines.map(wine => wine.price));
  const maxPrice = Math.max(...wines.map(wine => wine.price));
  
  // Initial state for filters
  const [filters, setFilters] = useState<FilterOptions>({
    wineType: [],
    wineries: [],
    priceRange: [minPrice, maxPrice]
  });

  // Control for popovers
  const typeDisclosure = useDisclosure();
  const wineryDisclosure = useDisclosure();
  const priceDisclosure = useDisclosure();

  // Update filters and trigger the parent component's handler
  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle wine type selection
  const handleWineTypeChange = (values: string[]) => {
    updateFilters({ wineType: values });
  };

  // Handle winery selection
  const handleWineryChange = (values: string[]) => {
    updateFilters({ wineries: values });
  };

  // Handle price range change
  const handlePriceRangeChange = (values: number[]) => {
    updateFilters({ priceRange: [values[0], values[1]] });
  };

  // Reset all filters
  const resetAllFilters = () => {
    setFilters({
      wineType: [],
      wineries: [],
      priceRange: [minPrice, maxPrice]
    });
    onFilterChange({
      wineType: [],
      wineries: [],
      priceRange: [minPrice, maxPrice]
    });
  };

  // Calculate counts for each filter option
  const wineTypeCounts = useMemo(() => {
    const counts = {
      red: wines.filter(wine => wine.type === 'RED').length,
      white: wines.filter(wine => wine.type === 'WHITE').length
    };
    return counts;
  }, [wines]);

  const wineryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    uniqueWineries.forEach(winery => {
      counts[winery] = wines.filter(wine => wine.winery === winery).length;
    });
    return counts;
  }, [wines, uniqueWineries]);

  // Check if price filter is active
  const isPriceFiltered = filters.priceRange[0] > minPrice || filters.priceRange[1] < maxPrice;

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    count += filters.wineType.length;
    count += filters.wineries.length;
    if (isPriceFiltered) count++;
    return count;
  };

  return (
    <HStack spacing={2} width="100%" justify="flex-end">
      <Box>
        <Popover
          isOpen={typeDisclosure.isOpen}
          onOpen={typeDisclosure.onOpen}
          onClose={typeDisclosure.onClose}
          placement="bottom-end"
        >
          <PopoverTrigger>
            <Tag 
              size="md" 
              colorScheme={filters.wineType.length > 0 ? "red" : "gray"}
              borderRadius="full" 
              cursor="pointer"
              variant="outline"
              bg="white"
              fontSize="md"
              py={2}
              px={3}
              _hover={{ bg: filters.wineType.length > 0 ? "red.50" : "gray.50" }}
            >
              <TagLabel>סוג יין</TagLabel>
              <TagRightIcon as={ChevronDownIcon} />
            </Tag>
          </PopoverTrigger>
          <PopoverContent width="200px">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader textAlign="right">בחר סוג יין</PopoverHeader>
            <PopoverBody>
              <CheckboxGroup 
                colorScheme="red" 
                onChange={handleWineTypeChange}
                value={filters.wineType}
              >
                <Stack spacing={2} direction="column" align="flex-start">
                  <Checkbox value="red">
                    <Flex justify="space-between" w="100%" align="center">
                      <Badge ml={2} colorScheme="red" borderRadius="full">{wineTypeCounts.red}</Badge>
                      <Text>אדום</Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox value="white">
                    <Flex justify="space-between" w="100%" align="center">
                      <Badge ml={2} colorScheme="yellow" borderRadius="full">{wineTypeCounts.white}</Badge>
                      <Text>לבן</Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>

      <Box>
        <Popover
          isOpen={wineryDisclosure.isOpen}
          onOpen={wineryDisclosure.onOpen}
          onClose={wineryDisclosure.onClose}
          placement="bottom-end"
        >
          <PopoverTrigger>
            <Tag 
              size="md" 
              colorScheme={filters.wineries.length > 0 ? "blue" : "gray"}
              borderRadius="full" 
              cursor="pointer"
              variant="outline"
              bg="white"
              fontSize="md"
              py={2}
              px={3}
              _hover={{ bg: filters.wineries.length > 0 ? "blue.50" : "gray.50" }}
            >
              <TagLabel>יקבים</TagLabel>
              <TagRightIcon as={ChevronDownIcon} />
            </Tag>
          </PopoverTrigger>
          <PopoverContent width="250px" maxHeight="300px" overflowY="auto">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader textAlign="right">בחר יקב</PopoverHeader>
            <PopoverBody>
              <CheckboxGroup 
                colorScheme="red"
                onChange={handleWineryChange}
                value={filters.wineries}
              >
                <Stack spacing={2} direction="column" align="flex-end">
                  {uniqueWineries.map(winery => (
                    <Checkbox key={winery} value={winery}>
                      <Flex justify="space-between" w="100%" align="center">
                        <Badge ml={2} colorScheme="blue" borderRadius="full">{wineryCounts[winery]}</Badge>
                        <Text>{winery}</Text>
                      </Flex>
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>

      <Box>
        <Popover
          isOpen={priceDisclosure.isOpen}
          onOpen={priceDisclosure.onOpen}
          onClose={priceDisclosure.onClose}
          placement="bottom-end"
        >
          <PopoverTrigger>
            <Tag 
              size="md" 
              colorScheme={isPriceFiltered ? "green" : "gray"}
              borderRadius="full" 
              cursor="pointer"
              variant="outline"
              bg="white"
              fontSize="md"
              py={2}
              px={3}
              _hover={{ bg: isPriceFiltered ? "green.50" : "gray.50" }}
            >
              <TagLabel>מחיר</TagLabel>
              <TagRightIcon as={ChevronDownIcon} />
            </Tag>
          </PopoverTrigger>
          <PopoverContent width="280px">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader textAlign="right">טווח מחירים</PopoverHeader>
            <PopoverBody>
              <Box p={4}>
                <HStack spacing={4} dir="ltr">
                  <Text>₪{filters.priceRange[0]}</Text>
                  <RangeSlider
                    aria-label={['מחיר מינימלי', 'מחיר מקסימלי']}
                    colorScheme="red"
                    defaultValue={[minPrice, maxPrice]}
                    min={minPrice}
                    max={maxPrice}
                    onChange={handlePriceRangeChange}
                    value={filters.priceRange}
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                  </RangeSlider>
                  <Text>₪{filters.priceRange[1]}</Text>
                </HStack>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>

      <Tag
        size="md"
        borderRadius="full"
        variant="outline"
        bg="white"
        fontSize="md"
        py={2}
        px={3}
        cursor="pointer"
        onClick={resetAllFilters}
        _hover={{ bg: "gray.50" }}
        hidden={getActiveFilterCount() === 0}
      >
        <TagLabel>נקה הכל</TagLabel>
        <TagCloseButton />
      </Tag>
    </HStack>
  );
} 