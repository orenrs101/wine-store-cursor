'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  Card,
  CardBody,
  Divider,
  Stack,
  HStack,
  Icon,
  Flex
} from '@chakra-ui/react'
import { Header } from '../components/Header'

// Feature icon
const FeatureIcon = ({ icon }: { icon: React.ReactNode }) => (
  <Flex
    w={12}
    h={12}
    align="center"
    justify="center"
    rounded="full"
    bg="red.100"
    mb={4}
  >
    {icon}
  </Flex>
)

export default function AboutPage() {
  return (
    <>
      <Header />
      <Container maxW="6xl" py={10}>
        <VStack spacing={16} align="stretch">
          {/* Hero Section */}
          <Stack 
            direction={{ base: 'column', md: 'row' }}
            spacing={10}
            align="center"
          >
            <Box flex={1}>
              <Heading as="h1" size="2xl" mb={6} textAlign="right">
                הסיפור שלנו
              </Heading>
              <Text fontSize="lg" textAlign="right">
                אתר היין שלי נוסד בשנת 2020 מתוך תשוקה אמיתית ליינות איכותיים והרצון להנגיש אותם לקהל הישראלי. אנו מאמינים שלכל אחד מגיע לחוות יינות מעולים שנבחרו בקפידה.
              </Text>
              <Text fontSize="lg" mt={4} textAlign="right">
                המשימה שלנו היא להביא אליכם את היינות הטובים ביותר מישראל ומהעולם, ולהעניק לכם חוויית קנייה יוצאת דופן הכוללת ייעוץ מקצועי ושירות אישי מהיועצים המומחים שלנו.
              </Text>
            </Box>
            <Box flex={1}>
              <Image
                src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="יקב"
                borderRadius="md"
                objectFit="cover"
                width="100%"
                height="400px"
                boxShadow="xl"
              />
            </Box>
          </Stack>

          <Divider />

          {/* Values Section */}
          <Box>
            <Heading as="h2" size="xl" mb={10} textAlign="center">
              הערכים שלנו
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <VStack align="center">
                <FeatureIcon 
                  icon={
                    <svg fill="currentColor" viewBox="0 0 24 24" width="24px" height="24px" color="red.600">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  } 
                />
                <Heading as="h3" size="md" textAlign="center">איכות ללא פשרות</Heading>
                <Text textAlign="center">
                  אנו בוחרים בקפידה רק את היינות האיכותיים ביותר, תוך דגש על טעם, איכות, וערך.
                </Text>
              </VStack>
              
              <VStack align="center">
                <FeatureIcon 
                  icon={
                    <svg fill="currentColor" viewBox="0 0 24 24" width="24px" height="24px" color="red.600">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  } 
                />
                <Heading as="h3" size="md" textAlign="center">יחס אישי</Heading>
                <Text textAlign="center">
                  השירות שלנו מותאם אישית לכל לקוח, עם צוות מומחים שתמיד זמין לייעץ ולהדריך.
                </Text>
              </VStack>
              
              <VStack align="center">
                <FeatureIcon 
                  icon={
                    <svg fill="currentColor" viewBox="0 0 24 24" width="24px" height="24px" color="red.600">
                      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                    </svg>
                  } 
                />
                <Heading as="h3" size="md" textAlign="center">ידע וחינוך</Heading>
                <Text textAlign="center">
                  אנו מאמינים בשיתוף הידע והניסיון שלנו, ומציעים אירועי טעימות, סדנאות ותוכן חינוכי.
                </Text>
              </VStack>
            </SimpleGrid>
          </Box>

          <Divider />

          {/* Team Section */}
          <Box>
            <Heading as="h2" size="xl" mb={10} textAlign="center">
              הצוות שלנו
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              <Card borderRadius="lg" overflow="hidden" boxShadow="md">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="יונתן מנהל"
                  height="250px"
                  objectFit="cover"
                />
                <CardBody>
                  <Heading as="h3" size="md" textAlign="center">יונתן לוי</Heading>
                  <Text textAlign="center" color="gray.600">מייסד ומנכ"ל</Text>
                </CardBody>
              </Card>
              
              <Card borderRadius="lg" overflow="hidden" boxShadow="md">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="מיכל סומלייה"
                  height="250px"
                  objectFit="cover"
                />
                <CardBody>
                  <Heading as="h3" size="md" textAlign="center">מיכל כהן</Heading>
                  <Text textAlign="center" color="gray.600">סומלייה ראשית</Text>
                </CardBody>
              </Card>
              
              <Card borderRadius="lg" overflow="hidden" boxShadow="md">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="דוד מנהל רכש"
                  height="250px"
                  objectFit="cover"
                />
                <CardBody>
                  <Heading as="h3" size="md" textAlign="center">דוד גולן</Heading>
                  <Text textAlign="center" color="gray.600">מנהל רכש</Text>
                </CardBody>
              </Card>
              
              <Card borderRadius="lg" overflow="hidden" boxShadow="md">
                <Image
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="עדי שירות לקוחות"
                  height="250px"
                  objectFit="cover"
                />
                <CardBody>
                  <Heading as="h3" size="md" textAlign="center">עדי שרון</Heading>
                  <Text textAlign="center" color="gray.600">מנהלת שירות לקוחות</Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </>
  )
} 