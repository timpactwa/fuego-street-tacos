'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/lib/cart-context'

const LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { count, openCart } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-charcoal text-white">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="font-display text-2xl text-golden tracking-wide">
          Fuego 🌮
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-body text-sm font-semibold transition-colors ${
                pathname === l.href ? 'text-golden' : 'text-white/80 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart icon */}
          <button
            onClick={openCart}
            className="relative p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Open cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-fuego text-white text-[10px] font-bold font-body w-4 h-4 rounded-full flex items-center justify-center tabular-nums leading-none">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-fuego text-white font-body font-bold text-sm px-5 py-2.5 rounded-full hover:bg-fuego/90 transition-colors"
          >
            Book a Table
          </Link>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={openCart}
            className="relative p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Open cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-fuego text-white text-[10px] font-bold font-body w-4 h-4 rounded-full flex items-center justify-center tabular-nums leading-none">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>
          <button
            className="text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-charcoal border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-body font-semibold text-white/80 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="inline-flex w-fit items-center bg-fuego text-white font-body font-bold text-sm px-5 py-2.5 rounded-full"
          >
            Book a Table
          </Link>
        </div>
      )}
    </header>
  )
}
