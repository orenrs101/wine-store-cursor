'use client'

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Heading,
  Input,
  Button,
  IconButton,
  VStack,
  HStack,
  Divider,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import NextLink from 'next/link'

// Social media icons
const FacebookIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="20px" height="20px">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
)

const InstagramIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="20px" height="20px">
    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428.247-.666.642-1.272 1.153-1.772a4.91 4.91 0 011.772-1.153c.637-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm5.5-9.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="20px" height="20px">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.677.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.131.332.202.043.72.043.433-.101.824z" />
  </svg>
)

export function Footer() {
  const [email, setEmail] = useState('')
  const toast = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: 'אנא הזן כתובת אימייל',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      return
    }
    
    // Here you would typically call an API to subscribe the user
    toast({
      title: 'נרשמת בהצלחה!',
      description: 'תודה שנרשמת לניוזלטר שלנו',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    
    setEmail('')
  }

  return (
    <Box
      as="footer"
      bg="gray.50"
      color="gray.700"
      mt={12}
      borderTop="1px"
      borderColor="gray.200"
    >
      <Container maxW="6xl" py={10}>
        <SimpleGrid 
          templateColumns={{ sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }}
          spacing={8}
          dir="rtl"
        >
          <Stack spacing={6}>
            <Box>
              <Heading size="md" color="red.600">אתר היין שלי</Heading>
            </Box>
            <Text fontSize="sm">
              חנות היין המובילה בישראל, מציעה מגוון רחב של יינות איכותיים מהארץ והעולם
            </Text>
            <HStack spacing={2}>
              <IconButton
                aria-label="פייסבוק"
                icon={<FacebookIcon />}
                variant="ghost"
                rounded="full"
                colorScheme="blue"
              />
              <IconButton
                aria-label="אינסטגרם"
                icon={<InstagramIcon />}
                variant="ghost"
                rounded="full"
                colorScheme="pink"
              />
              <IconButton
                aria-label="וואטסאפ"
                icon={<WhatsAppIcon />}
                variant="ghost"
                rounded="full"
                colorScheme="green"
              />
            </HStack>
          </Stack>
          
          <Stack align="flex-start">
            <Heading size="sm" mb={2}>מידע</Heading>
            <NextLink href="/" passHref>
              <Box as="a" _hover={{ color: "red.600" }}>דף הבית</Box>
            </NextLink>
            <NextLink href="/about" passHref>
              <Box as="a" _hover={{ color: "red.600" }}>אודות</Box>
            </NextLink>
            <NextLink href="/blog" passHref>
              <Box as="a" _hover={{ color: "red.600" }}>בלוג יין</Box>
            </NextLink>
            <NextLink href="/contact" passHref>
              <Box as="a" _hover={{ color: "red.600" }}>צור קשר</Box>
            </NextLink>
          </Stack>
          
          <Stack align="flex-start">
            <Heading size="sm" mb={2}>שירות לקוחות</Heading>
            <NextLink href="/shipping" passHref>
              <Box as="a" _hover={{ color: "red.600" }}>משלוחים</Box>
            </NextLink>
            <NextLink href="/returns" passHref>
              <Box as="a" _hover={{ color: "red.600" }}>מדיניות החזרות</Box>
            </NextLink>
            <NextLink href="/faq" passHref>
              <Box as="a" _hover={{ color: "red.600" }}>שאלות נפוצות</Box>
            </NextLink>
            <NextLink href="/terms" passHref>
              <Box as="a" _hover={{ color: "red.600" }}>תנאי שימוש</Box>
            </NextLink>
          </Stack>
          
          <Stack align="flex-start">
            <Heading size="sm" mb={2}>הרשמה לעדכונים</Heading>
            <Text fontSize="sm">
              הישארו מעודכנים עם הצעות מיוחדות, אירועי טעימות יין והשקות חדשות
            </Text>
            <Flex
              as="form"
              onSubmit={handleSubscribe}
              dir="ltr"
              width="100%"
            >
              <Input
                placeholder="הזן אימייל"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderEndRadius={0}
                textAlign="right"
              />
              <Button 
                type="submit"
                colorScheme="red"
                borderStartRadius={0}
              >
                הרשם
              </Button>
            </Flex>
          </Stack>
        </SimpleGrid>
        
        <Divider my={6} />
        
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          fontSize="sm"
          textAlign={{ base: 'center', md: 'right' }}
        >
          <Text>&copy; {new Date().getFullYear()} אתר היין שלי. כל הזכויות שמורות.</Text>
          <Text mt={{ base: 2, md: 0 }}>עיצוב ופיתוח ע״י הצוות שלנו</Text>
        </Flex>
      </Container>
    </Box>
  )
} 