'use client'

import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  FormControl,
} from '@chakra-ui/react'
import { useState } from 'react'

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <Box w="100%">
      <FormControl>
        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none" height="100%">
            <svg 
              fill="gray" 
              viewBox="0 0 24 24" 
              width="18px" 
              height="18px"
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </InputLeftElement>
          <Input
            placeholder="חפש יין לפי שם או יקב..."
            value={searchTerm}
            onChange={handleChange}
            textAlign="right"
            pr="14"
            height="50px"
            fontSize="md"
            borderRadius="full"
            bg="white"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
            _focus={{ boxShadow: "md", borderColor: "red.300" }}
          />
        </InputGroup>
      </FormControl>
    </Box>
  )
} 