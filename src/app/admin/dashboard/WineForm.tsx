'use client'

import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  HStack,
  useToast,
  Alert,
  AlertIcon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Wine } from '../../../types/wine'

interface WineFormProps {
  wine?: Wine | null
  onSave: (wine: Wine) => void
  onCancel: () => void
  getAuthHeaders: () => Record<string, string>
}

export default function WineForm({ wine, onSave, onCancel, getAuthHeaders }: WineFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    winery: '',
    price: 0,
    image: '',
    type: 'RED',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const toast = useToast()

  // Pre-fill form when editing
  useEffect(() => {
    if (wine) {
      setFormData({
        name: wine.name,
        winery: wine.winery,
        price: wine.price,
        image: wine.image,
        type: wine.type,
        description: wine.description || ''
      })
    }
  }, [wine])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name.trim() || !formData.winery.trim() || !formData.image.trim()) {
      setError('שם היין, יקב וקישור לתמונה הם שדות חובה')
      return
    }

    if (formData.price <= 0) {
      setError('המחיר חייב להיות גדול מאפס')
      return
    }

    setLoading(true)
    setError('')

    try {
      const url = wine ? `/api/admin/wines/${wine.id}` : '/api/admin/wines'
      const method = wine ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const savedWine = await response.json()
        toast({
          title: wine ? 'יין עודכן בהצלחה' : 'יין נוסף בהצלחה',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onSave(savedWine)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'שגיאה בשמירת היין')
      }
    } catch (err) {
      setError('שגיאה בחיבור לשרת')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <FormControl isRequired>
          <FormLabel textAlign="right">שם היין</FormLabel>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="לדוגמה: יין קברנה סוביניון"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel textAlign="right">יקב</FormLabel>
          <Input
            value={formData.winery}
            onChange={(e) => handleInputChange('winery', e.target.value)}
            placeholder="לדוגמה: יקב רמת הגולן"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel textAlign="right">מחיר (₪)</FormLabel>
          <NumberInput
            value={formData.price}
            onChange={(valueString, valueNumber) => handleInputChange('price', valueNumber || 0)}
            min={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl isRequired>
          <FormLabel textAlign="right">סוג יין</FormLabel>
          <Select
            value={formData.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
          >
            <option value="RED">אדום</option>
            <option value="WHITE">לבן</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel textAlign="right">קישור לתמונה</FormLabel>
          <Input
            value={formData.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
            placeholder="https://example.com/wine-image.jpg"
          />
        </FormControl>

        <FormControl>
          <FormLabel textAlign="right">תיאור (אופציונלי)</FormLabel>
          <Textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="תיאור היין, הארומות, המאפיינים..."
            rows={4}
          />
        </FormControl>

        <HStack spacing={4} width="100%" justify="flex-end">
          <Button variant="outline" onClick={onCancel}>
            ביטול
          </Button>
          <Button
            type="submit"
            colorScheme="red"
            isLoading={loading}
            loadingText="שומר..."
          >
            {wine ? 'עדכן יין' : 'הוסף יין'}
          </Button>
        </HStack>
      </VStack>
    </form>
  )
} 