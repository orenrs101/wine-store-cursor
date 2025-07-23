'use client'

import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
  Alert,
  AlertIcon,
  IconButton,
  Flex,
  Text
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Wine } from '../../../types/wine'
import WineForm from './WineForm'

// Edit and Delete icons
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
)

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
)

export default function AdminDashboard() {
  const [wines, setWines] = useState<Wine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingWine, setEditingWine] = useState<Wine | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const token = sessionStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
      return
    }
    fetchWines()
  }, [router])

  const getAuthHeaders = () => {
    const token = sessionStorage.getItem('adminToken')
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

  const fetchWines = async () => {
    try {
      const response = await fetch('/api/admin/wines', {
        headers: getAuthHeaders()
      })

      if (response.status === 401) {
        router.push('/admin')
        return
      }

      if (response.ok) {
        const data = await response.json()
        setWines(data)
      } else {
        setError('Failed to fetch wines')
      }
    } catch (err) {
      setError('Error loading wines')
    } finally {
      setLoading(false)
    }
  }

  const handleAddWine = () => {
    setEditingWine(null)
    onOpen()
  }

  const handleEditWine = (wine: Wine) => {
    setEditingWine(wine)
    onOpen()
  }

  const handleDeleteWine = async (wine: Wine) => {
    if (!confirm(`האם אתה בטוח שברצונך למחוק את "${wine.name}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/admin/wines/${wine.id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })

      if (response.ok) {
        setWines(wines.filter(w => w.id !== wine.id))
        toast({
          title: 'יין נמחק בהצלחה',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'שגיאה במחיקת היין',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (err) {
      toast({
        title: 'שגיאה במחיקת היין',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleWineSaved = (savedWine: Wine) => {
    if (editingWine) {
      // Update existing wine
      setWines(wines.map(w => w.id === savedWine.id ? savedWine : w))
    } else {
      // Add new wine
      setWines([savedWine, ...wines])
    }
    onClose()
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken')
    router.push('/admin')
  }

  if (loading) {
    return (
      <Container maxW="6xl" py={8}>
        <VStack spacing={4}>
          <Spinner size="xl" />
          <Text>טוען נתונים...</Text>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading color="red.600">ניהול יינות</Heading>
          <HStack>
            <Button colorScheme="red" onClick={handleAddWine}>
              הוסף יין חדש
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              התנתק
            </Button>
          </HStack>
        </Flex>

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th textAlign="right">שם היין</Th>
                <Th textAlign="right">יקב</Th>
                <Th textAlign="right">סוג</Th>
                <Th textAlign="right">מחיר</Th>
                <Th textAlign="right">פעולות</Th>
              </Tr>
            </Thead>
            <Tbody>
              {wines.map((wine) => (
                <Tr key={wine.id}>
                  <Td fontWeight="medium">{wine.name}</Td>
                  <Td>{wine.winery}</Td>
                  <Td>
                    <Badge colorScheme={wine.type === 'RED' ? 'red' : 'yellow'}>
                      {wine.type === 'RED' ? 'אדום' : 'לבן'}
                    </Badge>
                  </Td>
                  <Td>₪{wine.price}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="ערוך יין"
                        icon={<EditIcon />}
                        size="sm"
                        colorScheme="blue"
                        onClick={() => handleEditWine(wine)}
                      />
                      <IconButton
                        aria-label="מחק יין"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDeleteWine(wine)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {wines.length === 0 && !loading && (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">אין יינות להצגה</Text>
          </Box>
        )}

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {editingWine ? 'ערוך יין' : 'הוסף יין חדש'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <WineForm
                wine={editingWine}
                onSave={handleWineSaved}
                onCancel={onClose}
                getAuthHeaders={getAuthHeaders}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  )
} 