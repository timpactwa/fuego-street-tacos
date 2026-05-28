'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useCart, type CartItem } from '@/lib/cart-context'

type OrderType = 'pickup' | 'delivery'

const PICKUP_SLOTS = [
  '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM',
  '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM',
  '1:00 PM', '1:15 PM', '1:30 PM', '1:45 PM',
  '2:00 PM', '2:15 PM', '2:30 PM', '2:45 PM',
  '3:00 PM', '3:15 PM', '3:30 PM', '3:45 PM',
  '4:00 PM', '4:15 PM', '4:30 PM', '4:45 PM',
  '5:00 PM', '5:15 PM', '5:30 PM', '5:45 PM',
  '6:00 PM', '6:15 PM', '6:30 PM', '6:45 PM',
  '7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM',
  '8:00 PM', '8:15 PM', '8:30 PM', '8:45 PM',
]

const STEP_LABELS = ['Order Type', 'Details', 'Payment']

// ─── Order Summary Sidebar ───────────────────────────────────────────────────

function OrderSummary({
  items,
  total,
  deliveryFee,
}: {
  items: CartItem[]
  total: number
  deliveryFee: number
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-display text-xl text-charcoal mb-4">Order Summary</h3>
      <ul className="divide-y divide-gray-100 mb-4">
        {items.map(item => (
          <li key={item.name} className="py-3 flex justify-between items-center gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-6 h-6 bg-fuego/10 text-fuego text-xs font-bold rounded-full flex items-center justify-center font-body shrink-0">
                {item.quantity}
              </span>
              <span className="font-body text-sm font-semibold text-charcoal truncate">{item.name}</span>
            </div>
            <span className="font-body text-sm font-bold text-charcoal tabular-nums shrink-0">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex justify-between font-body text-sm text-muted">
          <span>Subtotal</span>
          <span className="tabular-nums">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-body text-sm text-muted">
          <span>Delivery fee</span>
          <span className="tabular-nums">{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : '—'}</span>
        </div>
        <div className="flex justify-between font-body font-black text-charcoal text-base pt-2 border-t border-gray-100">
          <span>Total</span>
          <span className="text-fuego tabular-nums">${(total + deliveryFee).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Step 1: Order Type ───────────────────────────────────────────────────────

function Step1({ onSelect }: { onSelect: (type: OrderType) => void }) {
  return (
    <div>
      <h2 className="font-display text-3xl text-charcoal mb-2">How would you like it?</h2>
      <p className="font-body text-muted text-sm mb-8">Choose pickup or delivery to continue</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onSelect('pickup')}
          className="group flex flex-col items-center gap-3 bg-white rounded-2xl p-8 shadow-sm border-2 border-transparent hover:border-fuego focus:border-fuego transition-all duration-200 hover:shadow-md outline-none"
        >
          <span className="text-5xl">🛍️</span>
          <div className="text-center">
            <p className="font-display text-2xl text-charcoal">Pickup</p>
            <p className="font-body text-sm text-muted mt-1">Ready in 15–20 min</p>
          </div>
          <span className="mt-2 text-xs font-body font-bold text-fuego uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            Select →
          </span>
        </button>
        <button
          onClick={() => onSelect('delivery')}
          className="group flex flex-col items-center gap-3 bg-white rounded-2xl p-8 shadow-sm border-2 border-transparent hover:border-fuego focus:border-fuego transition-all duration-200 hover:shadow-md outline-none"
        >
          <span className="text-5xl">🚗</span>
          <div className="text-center">
            <p className="font-display text-2xl text-charcoal">Delivery</p>
            <p className="font-body text-sm text-muted mt-1">35–45 min · $3.99 fee</p>
          </div>
          <span className="mt-2 text-xs font-body font-bold text-fuego uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            Select →
          </span>
        </button>
      </div>
    </div>
  )
}

// ─── Step 2: Details (pickup time or delivery address) ───────────────────────

type AddressState = { street: string; apt: string; city: string; zip: string }

function Step2({
  orderType,
  pickupTime,
  setPickupTime,
  address,
  setAddress,
  onContinue,
}: {
  orderType: OrderType
  pickupTime: string
  setPickupTime: (t: string) => void
  address: AddressState
  setAddress: (a: AddressState) => void
  onContinue: () => void
}) {
  const canContinue =
    orderType === 'pickup'
      ? !!pickupTime
      : !!(address.street && address.city && address.zip)

  if (orderType === 'pickup') {
    return (
      <div>
        <h2 className="font-display text-3xl text-charcoal mb-2">Pick your time</h2>
        <p className="font-body text-muted text-sm mb-6">We&apos;ll have it ready when you arrive · Mon–Thu 11am–9pm</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-8 max-h-72 overflow-y-auto pr-1">
          {PICKUP_SLOTS.map(slot => (
            <button
              key={slot}
              onClick={() => setPickupTime(slot)}
              className={`py-2.5 px-2 rounded-xl font-body text-sm font-semibold border-2 transition-all duration-150 ${
                pickupTime === slot
                  ? 'border-fuego bg-fuego text-white'
                  : 'border-gray-200 bg-white text-charcoal hover:border-fuego/50 hover:bg-fuego/5'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="w-full bg-fuego text-white font-body font-bold py-3.5 rounded-full hover:bg-fuego/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-display text-3xl text-charcoal mb-2">Delivery address</h2>
      <p className="font-body text-muted text-sm mb-6">We deliver within 5 miles of 47 South Street, Morristown</p>
      <div className="space-y-4 mb-8">
        <div>
          <label className="block font-body text-sm font-semibold text-charcoal mb-1.5">
            Street address
          </label>
          <input
            type="text"
            value={address.street}
            onChange={e => setAddress({ ...address, street: e.target.value })}
            placeholder="123 Main St"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-fuego transition-colors"
          />
        </div>
        <div>
          <label className="block font-body text-sm font-semibold text-charcoal mb-1.5">
            Apt / Unit{' '}
            <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            type="text"
            value={address.apt}
            onChange={e => setAddress({ ...address, apt: e.target.value })}
            placeholder="Apt 2B"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-fuego transition-colors"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-body text-sm font-semibold text-charcoal mb-1.5">City</label>
            <input
              type="text"
              value={address.city}
              onChange={e => setAddress({ ...address, city: e.target.value })}
              placeholder="Morristown"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-fuego transition-colors"
            />
          </div>
          <div>
            <label className="block font-body text-sm font-semibold text-charcoal mb-1.5">ZIP</label>
            <input
              type="text"
              value={address.zip}
              onChange={e =>
                setAddress({ ...address, zip: e.target.value.replace(/\D/g, '').slice(0, 5) })
              }
              placeholder="07960"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-fuego transition-colors"
            />
          </div>
        </div>
      </div>
      <button
        onClick={onContinue}
        disabled={!canContinue}
        className="w-full bg-fuego text-white font-body font-bold py-3.5 rounded-full hover:bg-fuego/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue →
      </button>
    </div>
  )
}

// ─── Step 3: Payment ──────────────────────────────────────────────────────────

type ContactState = { name: string; phone: string; email: string }
type PaymentState = { card: string; expiry: string; cvc: string }

function Step3({
  contact,
  setContact,
  payment,
  setPayment,
  loading,
  onPlaceOrder,
}: {
  contact: ContactState
  setContact: (c: ContactState) => void
  payment: PaymentState
  setPayment: (p: PaymentState) => void
  loading: boolean
  onPlaceOrder: () => void
}) {
  const cardDigits = payment.card.replace(/\s/g, '')
  const canOrder =
    !!contact.name &&
    !!contact.phone &&
    !!contact.email &&
    cardDigits.length === 16 &&
    payment.expiry.length === 5 &&
    payment.cvc.length === 3

  function formatCard(val: string) {
    return val
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim()
  }

  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return digits
  }

  return (
    <div>
      <h2 className="font-display text-3xl text-charcoal mb-6">Contact & Payment</h2>

      <div className="space-y-6">
        {/* Contact */}
        <div>
          <p className="font-body text-xs font-bold uppercase tracking-widest text-muted mb-4">
            Contact Info
          </p>
          <div className="space-y-3">
            <div>
              <label className="block font-body text-sm font-semibold text-charcoal mb-1.5">Name</label>
              <input
                type="text"
                value={contact.name}
                onChange={e => setContact({ ...contact, name: e.target.value })}
                placeholder="Alex Torres"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-fuego transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={e => setContact({ ...contact, phone: e.target.value })}
                  placeholder="(973) 555-0100"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-fuego transition-colors"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-1.5">Email</label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={e => setContact({ ...contact, email: e.target.value })}
                  placeholder="you@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-fuego transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div>
          <p className="font-body text-xs font-bold uppercase tracking-widest text-muted mb-4">
            Payment Details
          </p>
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-3">
            <div>
              <label className="block font-body text-sm font-semibold text-charcoal mb-1.5">
                Card number
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={payment.card}
                  onChange={e => setPayment({ ...payment, card: formatCard(e.target.value) })}
                  placeholder="1234 5678 9012 3456"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-14 font-body text-sm focus:outline-none focus:border-fuego transition-colors bg-white tabular-nums tracking-wider"
                />
                {/* Decorative card brand dots */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
                  <div className="w-5 h-3.5 bg-red-500 rounded-sm opacity-80" />
                  <div className="w-5 h-3.5 bg-orange-400 rounded-sm opacity-80 -ml-2.5" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-1.5">
                  Expiry
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={payment.expiry}
                  onChange={e => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })}
                  placeholder="MM/YY"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-fuego transition-colors bg-white tabular-nums"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-charcoal mb-1.5">
                  CVC
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={payment.cvc}
                  onChange={e =>
                    setPayment({ ...payment, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) })
                  }
                  placeholder="123"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-fuego transition-colors bg-white tabular-nums"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onPlaceOrder}
        disabled={!canOrder || loading}
        className="mt-8 w-full bg-fuego text-white font-body font-bold py-4 rounded-full hover:bg-fuego/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Place Order →
          </>
        )}
      </button>

      <p className="text-center font-body text-xs text-muted mt-4 flex items-center justify-center gap-1.5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Payments secured by Stripe. This is a demo — no real charge.
      </p>
    </div>
  )
}

// ─── Step 4: Confirmation ─────────────────────────────────────────────────────

function Step4({
  orderNumber,
  orderType,
  pickupTime,
  items,
}: {
  orderNumber: string
  orderType: OrderType | null
  pickupTime: string
  items: CartItem[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.15, damping: 12 }}
        className="w-20 h-20 bg-verde/20 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <svg
          className="w-10 h-10 text-verde"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <h2 className="font-display text-4xl text-charcoal mb-2">Order placed!</h2>
      <p className="font-body text-muted text-sm mb-1">Confirmation number</p>
      <p className="font-display text-3xl text-fuego mb-8">{orderNumber}</p>

      <div className="bg-white rounded-2xl p-6 shadow-sm text-left mb-6">
        <p className="font-body text-xs font-bold uppercase tracking-widest text-muted mb-4">
          Order Details
        </p>
        <ul className="space-y-2 mb-4">
          {items.map(item => (
            <li key={item.name} className="flex items-center gap-2 font-body text-sm text-charcoal">
              <span className="w-5 h-5 bg-fuego/10 text-fuego text-xs font-bold rounded-full flex items-center justify-center shrink-0 tabular-nums">
                {item.quantity}
              </span>
              {item.name}
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-100 pt-4 font-body text-sm text-muted">
          {orderType === 'pickup' ? (
            <p>🛍️ Pickup · Ready by {pickupTime}</p>
          ) : (
            <p>🚗 Delivery · Est. 35–45 min</p>
          )}
        </div>
      </div>

      <button
        disabled
        className="w-full border-2 border-charcoal/20 text-charcoal/50 font-body font-bold py-3.5 rounded-full cursor-not-allowed mb-4"
      >
        Track your order (coming soon)
      </button>
      <Link
        href="/menu"
        className="block font-body text-sm text-fuego font-bold underline underline-offset-2 hover:text-fuego/80 transition-colors"
      >
        ← Back to menu
      </Link>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderPage() {
  const { items, total, clearCart } = useCart()

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [orderType, setOrderType] = useState<OrderType | null>(null)
  const [pickupTime, setPickupTime] = useState('')
  const [address, setAddress] = useState<AddressState>({ street: '', apt: '', city: '', zip: '' })
  const [contact, setContact] = useState<ContactState>({ name: '', phone: '', email: '' })
  const [payment, setPayment] = useState<PaymentState>({ card: '', expiry: '', cvc: '' })
  const [loading, setLoading] = useState(false)
  const [confirmedItems, setConfirmedItems] = useState<CartItem[]>([])
  const [orderNumber] = useState(() => `#FG-${Math.floor(1000 + Math.random() * 9000)}`)

  const deliveryFee = orderType === 'delivery' ? 3.99 : 0

  function handleSelectType(type: OrderType) {
    setOrderType(type)
    setStep(2)
  }

  async function handlePlaceOrder() {
    setLoading(true)
    setConfirmedItems([...items])
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    clearCart()
    setStep(4)
  }

  // Empty cart guard — skip if we just confirmed (step 4)
  if (items.length === 0 && step !== 4) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <span className="text-6xl block mb-4">🌮</span>
          <h2 className="font-display text-3xl text-charcoal mb-2">Your cart is empty</h2>
          <p className="font-body text-muted text-sm mb-6">Add some tacos before checking out</p>
          <Link
            href="/menu"
            className="inline-flex bg-fuego text-white font-body font-bold px-6 py-3 rounded-full hover:bg-fuego/90 transition-colors"
          >
            Browse the menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Progress indicator (steps 1–3) */}
      {step < 4 && (
        <div className="bg-white border-b border-gray-100 px-6 py-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center">
              {STEP_LABELS.map((label, i) => {
                const stepNum = (i + 1) as 1 | 2 | 3
                const isActive = step === stepNum
                const isDone = step > stepNum
                return (
                  <div key={label} className="flex items-center flex-1 last:flex-none">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-body transition-colors ${
                          isDone
                            ? 'bg-verde text-white'
                            : isActive
                            ? 'bg-fuego text-white'
                            : 'bg-gray-200 text-muted'
                        }`}
                      >
                        {isDone ? (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          stepNum
                        )}
                      </div>
                      <span
                        className={`font-body text-sm font-semibold hidden sm:block ${
                          isActive ? 'text-charcoal' : 'text-muted'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < STEP_LABELS.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-3 transition-colors ${
                          isDone ? 'bg-verde' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Step content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {step === 1 && <Step1 onSelect={handleSelectType} />}
                {step === 2 && (
                  <Step2
                    orderType={orderType!}
                    pickupTime={pickupTime}
                    setPickupTime={setPickupTime}
                    address={address}
                    setAddress={setAddress}
                    onContinue={() => setStep(3)}
                  />
                )}
                {step === 3 && (
                  <Step3
                    contact={contact}
                    setContact={setContact}
                    payment={payment}
                    setPayment={setPayment}
                    loading={loading}
                    onPlaceOrder={handlePlaceOrder}
                  />
                )}
                {step === 4 && (
                  <Step4
                    orderNumber={orderNumber}
                    orderType={orderType}
                    pickupTime={pickupTime}
                    items={confirmedItems}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Order summary sidebar — desktop only, steps 1–3 */}
          {step < 4 && items.length > 0 && (
            <div className="w-full lg:w-80 lg:sticky lg:top-24 shrink-0">
              <OrderSummary items={items} total={total} deliveryFee={deliveryFee} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
