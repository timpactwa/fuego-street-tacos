'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const VALUES = [
  { emoji: '🌽', title: 'Locally Sourced', desc: 'We source our produce from farms within 50 miles. Fresh ingredients make better food. Simple.' },
  { emoji: '👨‍🍳', title: 'Made Fresh', desc: 'No freezer mystery. Every tortilla, every salsa, every guac is made the same day it hits your plate.' },
  { emoji: '📖', title: 'Real Recipes', desc: 'Our recipes come from families, not food labs. The al pastor marinade has been in the family for three generations.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-charcoal py-20 text-center">
        <p className="font-body text-golden font-bold uppercase tracking-widest text-sm mb-3">Our Story</p>
        <h1 className="font-display text-white text-6xl">Built Different</h1>
      </div>

      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-72 rounded-3xl bg-gradient-to-br from-fuego to-golden flex items-center justify-center text-8xl shadow-lg">
              🌮
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl text-charcoal mb-6">Started on a folding table.</h2>
            <p className="font-body text-muted leading-relaxed mb-4">
              Fuego started in 2021 as a weekend pop-up in the Morristown Green parking lot. Two friends, a borrowed griddle, and 40 pounds of skirt steak. We sold out in 90 minutes.
            </p>
            <p className="font-body text-muted leading-relaxed">
              Two years later we opened the doors on South Street. Same recipes. Same obsession with getting it right. Just a real kitchen now — and a lot more tortillas.
            </p>
          </motion.div>
        </div>

        <div className="mb-24">
          <h2 className="font-display text-4xl text-charcoal text-center mb-12">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-3xl p-8 shadow-sm text-center"
              >
                <div className="text-5xl mb-4">{v.emoji}</div>
                <h3 className="font-display text-2xl text-charcoal mb-3">{v.title}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-fuego rounded-3xl p-10 text-center">
          <h2 className="font-display text-white text-4xl mb-4">Come find us.</h2>
          <p className="font-body text-white/80 mb-8">47 South Street · Morristown, NJ · Open 6 days a week</p>
          <Link
            href="/menu"
            className="inline-flex bg-white text-fuego font-body font-bold px-8 py-3.5 rounded-full hover:bg-cream transition-colors"
          >
            See the Menu →
          </Link>
        </div>
      </section>
    </div>
  )
}
