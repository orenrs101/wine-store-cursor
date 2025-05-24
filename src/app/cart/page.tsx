'use client'

import { 
  Box, 
  Container, 
  Heading, 
  VStack, 
  HStack, 
  Text, 
  Image, 
  Button, 
  Flex, 
  Divider, 
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Card,
  CardBody,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useCart } from '../context/CartContext'
import { Header } from '../components/Header'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart()

  return (
    <>
      <Header />
      <Container maxW="4xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading textAlign="right" size="xl">עגלת הקניות</Heading>

          {items.length === 0 ? (
            <Card>
              <CardBody>
                <Alert
                  status="info"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  py={6}
                >
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    העגלה ריקה
                  </AlertTitle>
                  <AlertDescription maxWidth="sm">
                    לא נוספו מוצרים לעגלת הקניות שלך.
                  </AlertDescription>
                  <NextLink href="/" passHref>
                    <Button as="a" colorScheme="red" mt={6}>
                      המשך בקניות
                    </Button>
                  </NextLink>
                </Alert>
              </CardBody>
            </Card>
          ) : (
            <>
              <VStack 
                divider={<Divider />} 
                spacing={4} 
                align="stretch" 
                as="ul" 
                listStyleType="none"
              >
                {items.map((item) => (
                  <HStack key={item.id} as="li" spacing={4} justifyContent="space-between">
                    <HStack flex={1}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        boxSize="80px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <VStack align="start" flex={1} spacing={1}>
                        <Heading size="md">{item.name}</Heading>
                        <Text color="gray.600">{item.winery}</Text>
                        <HStack>
                          <Text color="gray.500">₪{item.price} × {item.quantity}</Text>
                          <Text fontWeight="bold">₪{item.price * item.quantity}</Text>
                        </HStack>
                      </VStack>
                    </HStack>

                    <HStack spacing={2}>
                      <NumberInput 
                        defaultValue={item.quantity} 
                        min={1} 
                        max={99}
                        maxW={20}
                        onChange={(_, valueAsNumber) => 
                          updateQuantity(item.id, valueAsNumber)
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <IconButton
                        aria-label="הסר מהעגלה"
                        icon={
                          <svg fill="currentColor" viewBox="0 0 24 24" width="18px" height="18px">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        }
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                      />
                    </HStack>
                  </HStack>
                ))}
              </VStack>

              <Card mt={8}>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <Flex justifyContent="space-between" fontWeight="bold">
                      <Text fontSize="xl">סה״כ:</Text>
                      <Text fontSize="xl">₪{cartTotal}</Text>
                    </Flex>

                    <Divider />

                    <Flex justifyContent="space-between">
                      <NextLink href="/" passHref>
                        <Button as="a" variant="outline">
                          המשך בקניות
                        </Button>
                      </NextLink>

                      <NextLink href="/checkout" passHref>
                        <Button 
                          as="a"
                          colorScheme="green" 
                          size="lg"
                        >
                          מעבר לתשלום
                        </Button>
                      </NextLink>
                    </Flex>
                  </VStack>
                </CardBody>
              </Card>
            </>
          )}
        </VStack>
      </Container>
    </>
  )
} 