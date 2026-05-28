'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, total } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="font-display text-2xl text-charcoal">Your Order</h2>
              <button
                onClick={closeCart}
                className="text-muted hover:text-charcoal transition-colors p-1 rounded-lg hover:bg-gray-100"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Item list */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-20">
                  <span className="text-5xl">🌮</span>
                  <p className="font-body text-muted text-sm leading-relaxed">
                    Nothing here yet —<br />add something from the menu
                  </p>
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="text-fuego font-body font-bold text-sm underline underline-offset-2 hover:text-fuego/80 transition-colors"
                  >
                    Browse the menu →
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {items.map(item => (
                    <li key={item.name} className="py-4 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-body font-bold text-charcoal text-sm leading-tight truncate">
                          {item.name}
                        </p>
                        <p className="font-body text-xs text-muted tabular-nums">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-gray-100 text-charcoal font-bold text-sm flex items-center justify-center hover:bg-gray-200 transition-colors"
                          aria-label={`Remove one ${item.name}`}
                        >
                          −
                        </button>
                        <span className="font-body font-bold text-charcoal text-sm w-5 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-fuego text-white font-bold text-sm flex items-center justify-center hover:bg-fuego/90 transition-colors"
                          aria-label={`Add one more ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.name)}
                        className="text-muted hover:text-fuego transition-colors p-1 ml-1"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer with subtotal + CTA */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-body font-bold text-charcoal">Subtotal</span>
                  <span className="font-body font-black text-fuego text-lg tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/order"
                  onClick={closeCart}
                  className="block w-full text-center bg-fuego text-white font-body font-bold py-3.5 rounded-full hover:bg-fuego/90 transition-colors"
                >
                  Proceed to Checkout →
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
