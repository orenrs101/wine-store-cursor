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
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Card,
  CardBody,
  CardHeader,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../context/CartContext'
import { Header } from '../components/Header'

export default function CheckoutPage() {
  const { items, cartTotal, removeFromCart } = useCart()
  const router = useRouter()
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveInfo: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: 'הזמנה התקבלה!',
        description: 'ההזמנה שלך נקלטה במערכת ומספר ההזמנה שלך הוא #WO-12345',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      
      // Clear cart and redirect to confirmation page
      items.forEach(item => removeFromCart(item.id))
      router.push('/thank-you')
    }, 1500)
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <Container maxW="4xl" py={8}>
          <Card>
            <CardBody>
              <Alert
                status="warning"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                py={6}
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  עגלת הקניות ריקה
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  יש להוסיף מוצרים לעגלה לפני המשך לתשלום.
                </AlertDescription>
                <NextLink href="/" passHref>
                  <Button as="a" colorScheme="red" mt={6}>
                    המשך בקניות
                  </Button>
                </NextLink>
              </Alert>
            </CardBody>
          </Card>
        </Container>
      </>
    )
  }

  return (
    <>
      <Header />
      <Container maxW="6xl" py={8}>
        <Heading textAlign="right" size="xl" mb={8}>השלמת הרכישה</Heading>
        
        <Grid 
          templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={6}
          as="form"
          onSubmit={handleSubmit}
        >
          {/* Left Column - Order Summary */}
          <GridItem colSpan={1} order={{ base: 2, lg: 1 }}>
            <Card>
              <CardHeader>
                <Heading size="md" textAlign="right">סיכום הזמנה</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {items.map((item) => (
                    <HStack key={item.id} spacing={3} justifyContent="space-between">
                      <HStack spacing={3}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          boxSize="60px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                        <Box>
                          <Text fontWeight="medium" fontSize="sm">{item.name}</Text>
                          <Text color="gray.600" fontSize="xs">{item.quantity} × ₪{item.price}</Text>
                        </Box>
                      </HStack>
                      <Text fontWeight="semibold">₪{item.price * item.quantity}</Text>
                    </HStack>
                  ))}
                  
                  <Divider />
                  
                  <Flex justifyContent="space-between">
                    <Text>סכום ביניים:</Text>
                    <Text>₪{cartTotal}</Text>
                  </Flex>
                  
                  <Flex justifyContent="space-between">
                    <Text>משלוח:</Text>
                    <Text>₪40</Text>
                  </Flex>
                  
                  <Divider />
                  
                  <Flex justifyContent="space-between" fontWeight="bold">
                    <Text>סה״כ לתשלום:</Text>
                    <Text>₪{cartTotal + 40}</Text>
                  </Flex>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
          
          {/* Right Column - Forms */}
          <GridItem colSpan={{ base: 1, lg: 2 }} order={{ base: 1, lg: 2 }}>
            <VStack spacing={8} align="stretch">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <Heading size="md" textAlign="right">פרטי משלוח</Heading>
                </CardHeader>
                <CardBody>
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} dir="rtl">
                    <FormControl isRequired>
                      <FormLabel>שם פרטי</FormLabel>
                      <Input 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        textAlign="right"
                      />
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>שם משפחה</FormLabel>
                      <Input 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        textAlign="right"
                      />
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>טלפון</FormLabel>
                      <Input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        textAlign="right"
                        type="tel"
                      />
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>אימייל</FormLabel>
                      <Input 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        textAlign="right"
                        type="email"
                      />
                    </FormControl>
                    
                    <FormControl isRequired gridColumn={{ md: 'span 2' }}>
                      <FormLabel>כתובת</FormLabel>
                      <Input 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        textAlign="right"
                      />
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>עיר</FormLabel>
                      <Select 
                        name="city"
                        value={formData.city}
                        onChange={handleSelectChange}
                        placeholder="בחר עיר"
                        textAlign="right"
                      >
                        <option value="תל אביב">תל אביב</option>
                        <option value="ירושלים">ירושלים</option>
                        <option value="חיפה">חיפה</option>
                        <option value="באר שבע">באר שבע</option>
                        <option value="אשדוד">אשדוד</option>
                        <option value="נתניה">נתניה</option>
                        <option value="רעננה">רעננה</option>
                        <option value="כפר סבא">כפר סבא</option>
                        <option value="אחר">אחר</option>
                      </Select>
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>מיקוד</FormLabel>
                      <Input 
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        textAlign="right"
                      />
                    </FormControl>
                  </Grid>
                </CardBody>
              </Card>
              
              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <Heading size="md" textAlign="right">פרטי תשלום</Heading>
                </CardHeader>
                <CardBody>
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} dir="rtl">
                    <FormControl isRequired gridColumn={{ md: 'span 2' }}>
                      <FormLabel>מספר כרטיס אשראי</FormLabel>
                      <Input 
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        textAlign="right"
                        placeholder="0000 0000 0000 0000"
                      />
                    </FormControl>
                    
                    <FormControl isRequired gridColumn={{ md: 'span 2' }}>
                      <FormLabel>שם בעל הכרטיס</FormLabel>
                      <Input 
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        textAlign="right"
                      />
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>תוקף</FormLabel>
                      <Input 
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        textAlign="right"
                        placeholder="MM/YY"
                      />
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>קוד אבטחה (CVV)</FormLabel>
                      <Input 
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        textAlign="right"
                        type="password"
                        maxLength={4}
                      />
                    </FormControl>
                    
                    <FormControl gridColumn={{ md: 'span 2' }}>
                      <Checkbox 
                        name="saveInfo"
                        isChecked={formData.saveInfo}
                        onChange={handleInputChange}
                        colorScheme="red"
                      >
                        שמור פרטים לרכישה הבאה
                      </Checkbox>
                    </FormControl>
                  </Grid>
                </CardBody>
              </Card>
              
              {/* Checkout Button */}
              <Flex justifyContent="space-between" mt={6}>
                <NextLink href="/cart" passHref>
                  <Button as="a" variant="outline">
                    חזרה לעגלת הקניות
                  </Button>
                </NextLink>
                
                <Button 
                  type="submit"
                  colorScheme="green" 
                  size="lg"
                  isLoading={isSubmitting}
                  loadingText="מעבד הזמנה..."
                >
                  השלם הזמנה
                </Button>
              </Flex>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </>
  )
} 