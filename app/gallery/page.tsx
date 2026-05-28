'use client'
import { motion } from 'framer-motion'

const PHOTOS = [
  { caption: 'The Al Pastor', from: 'from-amber-400', to: 'to-orange-500', emoji: '🍍', tall: true },
  { caption: 'Carne Asada Night', from: 'from-red-500', to: 'to-rose-700', emoji: '🔥', tall: false },
  { caption: 'Fresh Guac', from: 'from-emerald-400', to: 'to-green-600', emoji: '🥑', tall: false },
  { caption: 'Street Corn', from: 'from-yellow-400', to: 'to-amber-500', emoji: '🌽', tall: true },
  { caption: 'Saturday Night', from: 'from-[#E63946]', to: 'to-rose-600', emoji: '✨', tall: false },
  { caption: 'The Pescado', from: 'from-teal-400', to: 'to-cyan-600', emoji: '🐟', tall: false },
  { caption: 'Tres Leches', from: 'from-pink-300', to: 'to-rose-400', emoji: '🍓', tall: true },
  { caption: 'Agua Fresca', from: 'from-red-400', to: 'to-pink-500', emoji: '🌺', tall: false },
  { caption: 'Churros', from: 'from-amber-500', to: 'to-yellow-600', emoji: '🍩', tall: false },
]

export default function GalleryPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-charcoal py-20 text-center">
        <p className="font-body text-golden font-bold uppercase tracking-widest text-sm mb-3">The Vibe</p>
        <h1 className="font-display text-white text-6xl">Gallery</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="columns-2 md:columns-3 gap-5 space-y-5">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.caption}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="break-inside-avoid rounded-3xl overflow-hidden shadow-md cursor-pointer"
            >
              <div
                className={`bg-gradient-to-br ${photo.from} ${photo.to} flex items-center justify-center ${photo.tall ? 'h-72' : 'h-48'} text-7xl`}
              >
                {photo.emoji}
              </div>
              <div className="bg-white px-5 py-3">
                <p className="font-body font-semibold text-charcoal text-sm">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
