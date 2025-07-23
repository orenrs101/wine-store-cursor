'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Button,
  Flex,
  VStack,
  HStack,
  Badge,
  Divider,
  SimpleGrid,
  Icon,
  Card,
  CardBody,
  useToast
} from '@chakra-ui/react'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Header } from '../../components/Header'
import { useCart } from '../../context/CartContext'
import { Wine } from '../../../types/wine'
import { fetchWineById } from '../../../lib/api'

export default function WineDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const toast = useToast()
  const [wine, setWine] = useState<Wine | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadWine() {
      try {
        setLoading(true)
        const id = params.id as string
        const foundWine = await fetchWineById(id)
        setWine(foundWine)
      } catch (error) {
        console.error('Error loading wine:', error)
        setWine(null)
      } finally {
        setLoading(false)
      }
    }

    loadWine()
  }, [params.id])

  // If wine not found, show error and return to home
  if (!loading && !wine) {
    router.push('/')
    return null
  }

  const handleAddToCart = () => {
    if (wine) {
      // Add wine to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(wine)
      }
      
      toast({
        title: 'נוסף לסל',
        description: `${wine.name} (כמות: ${quantity}) נוסף לעגלת הקניות שלך`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  if (loading || !wine) {
    return (
      <>
        <Header />
        <Container maxW="6xl" py={10}>
          <Box textAlign="center" py={10}>
            טוען...
          </Box>
        </Container>
      </>
    )
  }

  // Get type in Hebrew
  const wineTypeHebrew = wine.type === 'RED' ? 'אדום' : 'לבן'

  return (
    <>
      <Header />
      <Container maxW="6xl" py={10}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {/* Left Column - Wine Image */}
          <Box>
            <Image
              src={wine.image}
              alt={wine.name}
              borderRadius="md"
              boxShadow="md"
              objectFit="cover"
              width="100%"
              height="500px"
            />
          </Box>
          
          {/* Right Column - Wine Information */}
          <VStack spacing={6} align="stretch" textAlign="right">
            <Box>
              <Badge 
                colorScheme={wine.type === 'RED' ? 'red' : 'yellow'} 
                fontSize="md" 
                px={2} 
                py={1} 
                borderRadius="full"
                mb={2}
              >
                יין {wineTypeHebrew}
              </Badge>
              <Heading size="xl">{wine.name}</Heading>
              <Text fontSize="lg" color="gray.600" fontWeight="medium">{wine.winery}</Text>
            </Box>
            
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">
              ₪{wine.price}
            </Text>
            
            <Divider />
            
            <Box>
              <Heading size="md" mb={2}>תיאור</Heading>
              <Text>
                {wine.description || 
                  `יין ${wineTypeHebrew} איכותי מ${wine.winery}. יין זה הוא בחירה מצוינת לארוחות ערב מיוחדות או אירועים. היין בעל ארומה עשירה וטעם ייחודי המשקף את אזור הגידול והמומחיות של היקב.`}
              </Text>
            </Box>
            
            <Box>
              <Heading size="md" mb={3}>פרטים</Heading>
              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Text fontWeight="bold">יקב:</Text>
                  <Text>{wine.winery}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">סוג:</Text>
                  <Text>יין {wineTypeHebrew}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">נפח:</Text>
                  <Text>750 מ"ל</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">אלכוהול:</Text>
                  <Text>{Math.floor(Math.random() * 3) + 12}%</Text>
                </Box>
              </SimpleGrid>
            </Box>
            
            <Divider />
            
            <Card>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Flex justify="space-between">
                    <HStack spacing={3}>
                      <Button 
                        size="sm" 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        aria-label="הפחתת כמות"
                      >
                        -
                      </Button>
                      <Text fontWeight="bold">{quantity}</Text>
                      <Button 
                        size="sm" 
                        onClick={() => setQuantity(quantity + 1)}
                        aria-label="הגדלת כמות"
                      >
                        +
                      </Button>
                    </HStack>
                    <Button 
                      colorScheme="red" 
                      size="lg"
                      onClick={handleAddToCart}
                      leftIcon={
                        <Icon viewBox="0 0 24 24" boxSize={5}>
                          <path 
                            fill="currentColor" 
                            d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
                          />
                        </Icon>
                      }
                    >
                      הוסף לסל
                    </Button>
                  </Flex>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </SimpleGrid>
      </Container>
    </>
  )
} 