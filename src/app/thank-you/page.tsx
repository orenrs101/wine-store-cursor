'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Flex,
  Icon,
  Divider,
  Card,
  CardBody
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { Header } from '../components/Header'

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <Container maxW="2xl" py={10}>
        <Card boxShadow="lg" borderRadius="xl">
          <CardBody>
            <VStack spacing={8} p={4} textAlign="center">
              <Icon 
                viewBox="0 0 24 24" 
                boxSize="80px" 
                color="green.500"
              >
                <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.2" />
                <path
                  fill="currentColor"
                  d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                />
              </Icon>
              
              <Heading size="lg">תודה על הזמנתך!</Heading>
              
              <Text>
                ההזמנה שלך #WO-12345 התקבלה בהצלחה ונמצאת בטיפול.
                אישור הזמנה נשלח לכתובת הדוא״ל שציינת בהזמנה.
              </Text>
              
              <Box bg="gray.50" p={4} borderRadius="md" width="100%">
                <VStack spacing={3} align="start">
                  <Text fontWeight="bold" textAlign="right">פרטי הזמנה:</Text>
                  <Flex justify="space-between" width="100%">
                    <Text>מספר הזמנה:</Text>
                    <Text fontWeight="medium">WO-12345</Text>
                  </Flex>
                  <Flex justify="space-between" width="100%">
                    <Text>תאריך:</Text>
                    <Text fontWeight="medium">{new Date().toLocaleDateString('he-IL')}</Text>
                  </Flex>
                  <Flex justify="space-between" width="100%">
                    <Text>סטטוס:</Text>
                    <Text fontWeight="medium" color="green.500">התקבלה</Text>
                  </Flex>
                </VStack>
              </Box>
              
              <Text>
                תוכל לעקוב אחר סטטוס ההזמנה שלך באמצעות מספר ההזמנה.
                היין שלך יישלח בתוך 1-3 ימי עסקים.
              </Text>
              
              <Divider />
              
              <NextLink href="/" passHref>
                <Button as="a" colorScheme="red" size="lg">
                  המשך בקניות
                </Button>
              </NextLink>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    </>
  )
} 