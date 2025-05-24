'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Wine } from '../data/wines'

interface CartItem extends Wine {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (wine: Wine) => void
  removeFromCart: (wineId: number) => void
  updateQuantity: (wineId: number, quantity: number) => void
  cartCount: number
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (wine: Wine) => {
    setItems(prevItems => {
      // Check if wine is already in cart
      const existingItem = prevItems.find(item => item.id === wine.id)
      
      if (existingItem) {
        // Increase quantity if already in cart
        return prevItems.map(item => 
          item.id === wine.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      } else {
        // Add new item to cart
        return [...prevItems, { ...wine, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (wineId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== wineId))
  }

  const updateQuantity = (wineId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(wineId)
      return
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.id === wineId 
          ? { ...item, quantity } 
          : item
      )
    )
  }

  // Calculate total number of items in cart
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)
  
  // Calculate total price
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 