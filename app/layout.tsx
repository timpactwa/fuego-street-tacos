import type { Metadata } from 'next'
import { Pacifico, Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/lib/cart-context'
import CartDrawer from '@/components/CartDrawer'

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: { default: 'Fuego Street Tacos', template: '%s | Fuego Street Tacos' },
  description: 'Authentic street tacos in Morristown, NJ. Born on the block, built for the hungry.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pacifico.variable} ${nunito.variable}`}>
      <body className="font-body bg-cream text-charcoal">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
