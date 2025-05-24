'use client'

import {
  Box,
  Flex,
  Text,
  IconButton,
  Container,
  Heading,
  Badge,
  useColorModeValue,
  Link,
  HStack,
  useColorMode
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

// Moon icon for dark mode
const MoonIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="20px" height="20px">
    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
  </svg>
);

// Sun icon for light mode
const SunIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="22px" height="22px">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
  </svg>
);

export function Header() {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  
  // Add scroll event listener to track when header is scrolled
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }
  
  return (
    <Box 
      as="header" 
      position="sticky" 
      top="0"
      zIndex="100" 
      bg={useColorModeValue('white', 'black')}
      boxShadow={isScrolled ? "md" : "sm"}
      transition="box-shadow 0.2s"
    >
      {/* Top navigation */}
      <Box width="100%" maxWidth="1600px" mx="auto">
        <Flex 
          justify="space-between" 
          align="center" 
          py={4}
          px={{ base: 4, md: 6, lg: 8 }}
        >
          <NextLink href="/" passHref>
            <Link _hover={{ textDecoration: 'none' }}>
              <Heading size="md" color="red.600">אתר היין שלי</Heading>
            </Link>
          </NextLink>
          
          <HStack spacing={3}>
            <IconButton
              aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              colorScheme="gray"
              size="md"
            />
            
            <Box position="relative">
              <NextLink href="/cart" passHref>
                <IconButton
                  as="a"
                  aria-label="צפה בעגלת הקניות"
                  icon={
                    <svg 
                      fill="currentColor" 
                      viewBox="0 0 24 24" 
                      width="24px" 
                      height="24px"
                    >
                      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  }
                  colorScheme="red"
                  variant="outline"
                  size="md"
                />
              </NextLink>
              {cartCount > 0 && (
                <Badge
                  colorScheme="red"
                  borderRadius="full"
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  fontSize="xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Box>
          </HStack>
        </Flex>
      </Box>
    </Box>
  )
} 