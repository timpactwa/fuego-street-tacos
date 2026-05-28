'use client'
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type CartItem = {
  name: string
  price: number
  quantity: number
  category: string
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (name: string) => void
  updateQuantity: (name: string, qty: number) => void
  clearCart: () => void
  total: number
  count: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.name === item.name)
      if (existing) {
        return prev.map(i =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((name: string) => {
    setItems(prev => prev.filter(i => i.name !== name))
  }, [])

  const updateQuantity = useCallback((name: string, qty: number) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.name !== name))
    } else {
      setItems(prev => prev.map(i => i.name === name ? { ...i, quantity: qty } : i))
    }
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count, isOpen, openCart, closeCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
