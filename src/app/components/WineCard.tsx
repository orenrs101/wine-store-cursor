'use client'

import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Box,
  Badge,
  useToast,
  Flex,
  Spacer,
  Link,
  useColorModeValue
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useCart } from '../context/CartContext'
import { Wine } from '../../types/wine'

interface WineCardProps {
  wine: Wine;
}

export function WineCard({ wine }: WineCardProps) {
  const { addToCart } = useCart();
  const toast = useToast();
  const typeText = wine.type === 'RED' ? 'אדום' : 'לבן';
  
  // Color mode values
  const cardBg = useColorModeValue('white', 'black');
  const cardBorder = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const priceColor = useColorModeValue('gray.900', 'white');
  const imageContainerBg = useColorModeValue('white', 'black');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // Prevent event bubbling
    
    addToCart(wine);
    toast({
      title: 'נוסף לסל',
      description: `${wine.name} נוסף לעגלת הקניות שלך`,
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <NextLink href={`/wine/${wine.id}`} passHref style={{ display: 'flex', justifyContent: 'center' }}>
      <Card 
        as={Link}
        direction="column" 
        overflow="hidden" 
        width="90%"
        maxW="280px"
        borderColor={cardBorder}
        borderWidth="1px"
        bg={cardBg}
        transition="transform 0.2s, box-shadow 0.2s"
        _hover={{ 
          transform: 'translateY(-4px)', 
          boxShadow: 'lg',
          textDecoration: 'none'
        }}
      >
        <Box position="relative" width="100%" bg={imageContainerBg}>
          <Image
            src={wine.image}
            alt={wine.name}
            h="250"
            w="100%"
            objectFit="contain"
          />
          <Badge 
            position="absolute" 
            top="2" 
            left="2" 
            colorScheme={wine.type === 'RED' ? 'red' : 'yellow'} 
            px="2" 
            py="1" 
            borderRadius="full"
            fontSize="xs"
            fontWeight="bold"
          >
            {typeText}
          </Badge>
        </Box>
        <CardBody p={3}>
          <Stack spacing="2">
            <Heading size="sm" textAlign="right" noOfLines={1}>{wine.name}</Heading>
            <Text textAlign="right" color={textColor} fontSize="sm" noOfLines={1}>
              {wine.winery}
            </Text>
            <Flex alignItems="center" justifyContent="space-between">
              <Text textAlign="right" color={priceColor} fontSize="lg" fontWeight="bold">
                ₪{wine.price}
              </Text>
              <Button 
                variant="solid" 
                colorScheme="red" 
                size="sm"
                onClick={handleAddToCart}
              >
                הוסף לסל
              </Button>
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    </NextLink>
  )
} 