'use client'

import {
  Box,
  Container,
  Heading,
  VStack,
  Input,
  Button,
  Alert,
  AlertIcon,
  useToast,
  Card,
  CardBody,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Eye icon for password visibility toggle
const ViewIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  </svg>
)

const ViewOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
  </svg>
)

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!password) {
      setError('Please enter the admin password')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Test the admin credentials by making a request to the admin API
      const response = await fetch('/api/admin/wines', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      })

      if (response.ok) {
        // Store the password in sessionStorage (in production, use proper JWT)
        sessionStorage.setItem('adminToken', password)
        
        toast({
          title: 'התחברות בוצעה בהצלחה',
          description: 'ברוך הבא למערכת הניהול',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        
        router.push('/admin/dashboard')
      } else {
        setError('סיסמה שגויה. נסה שוב.')
      }
    } catch (err) {
      setError('שגיאה בהתחברות. נסה שוב.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxW="md" py={20}>
      <VStack spacing={8}>
        <Heading textAlign="center" color="red.600">
          מערכת ניהול יינות
        </Heading>
        
        <Card width="100%" maxW="400px">
          <CardBody>
            <form onSubmit={handleLogin}>
              <VStack spacing={4}>
                <Heading size="md" textAlign="center" mb={4}>
                  התחברות מנהל
                </Heading>
                
                {error && (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
                
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="סיסמת מנהל"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="lg"
                  />
                  <InputRightElement height="100%">
                    <IconButton
                      aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      size="sm"
                    />
                  </InputRightElement>
                </InputGroup>
                
                <Button
                  type="submit"
                  colorScheme="red"
                  size="lg"
                  width="100%"
                  isLoading={loading}
                  loadingText="מתחבר..."
                >
                  התחבר
                </Button>
                
                <Box textAlign="center" fontSize="sm" color="gray.600">
                  סיסמה ברירת מחדל: admin123
                </Box>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
} 