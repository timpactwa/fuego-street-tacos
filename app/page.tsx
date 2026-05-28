'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const FEATURED = [
  {
    name: 'Carne Asada',
    desc: 'Grilled skirt steak, pico, guacamole, fresh cilantro.',
    price: '$5',
    from: 'from-red-600',
    via: 'via-rose-500',
    to: 'to-orange-500',
    emoji: '🥩',
    tag: 'Smoky',
  },
  {
    name: 'Al Pastor',
    desc: 'Marinated pork, charred pineapple, white onion, cilantro.',
    price: '$5',
    from: 'from-amber-500',
    via: 'via-orange-400',
    to: 'to-yellow-400',
    emoji: '🍍',
    tag: 'Sweet heat',
  },
  {
    name: 'Pescado',
    desc: 'Crispy fried fish, purple slaw, lime crema, pickled jalapeño.',
    price: '$5',
    from: 'from-teal-500',
    via: 'via-cyan-400',
    to: 'to-emerald-400',
    emoji: '🐟',
    tag: 'Coastal',
  },
]

const WHY = [
  { icon: '🌿', label: 'Fresh Daily', desc: 'Every ingredient prepped that morning. No shortcuts, no freezer shelf.' },
  { icon: '🔥', label: 'Made to Order', desc: 'Your food hits the grill when you order. Always hot, never sitting.' },
  { icon: '🤝', label: 'Real Recipes', desc: 'Family recipes from Puebla, not a corporate formula. You taste it.' },
]

const MARQUEE = ['Tacos', '★', 'Burritos', '★', 'Quesadillas', '★', 'Aguas Frescas', '★', 'Salsa Bar', '★', 'Horchata', '★']

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

const zigzagClip =
  'polygon(0 100%, 2.5% 0, 5% 100%, 7.5% 0, 10% 100%, 12.5% 0, 15% 100%, 17.5% 0, 20% 100%, 22.5% 0, 25% 100%, 27.5% 0, 30% 100%, 32.5% 0, 35% 100%, 37.5% 0, 40% 100%, 42.5% 0, 45% 100%, 47.5% 0, 50% 100%, 52.5% 0, 55% 100%, 57.5% 0, 60% 100%, 62.5% 0, 65% 100%, 67.5% 0, 70% 100%, 72.5% 0, 75% 100%, 77.5% 0, 80% 100%, 82.5% 0, 85% 100%, 87.5% 0, 90% 100%, 92.5% 0, 95% 100%, 97.5% 0, 100% 100%)'

export default function Home() {
  return (
    <>
      {/* ─────────────────────────  HERO  ───────────────────────── */}
      <section className="min-h-screen bg-charcoal flex items-center relative overflow-hidden">
        {/* diagonal stripe texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #E63946 0, #E63946 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* warm radial glow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-fuego/30 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-golden/20 blur-[120px]" />

        {/* floating decorative emoji */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 1, rotate: -12, y: [0, -10, 0] }}
          transition={{ opacity: { duration: 1 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
          className="hidden md:block absolute top-32 right-24 text-7xl drop-shadow-2xl select-none"
        >
          🌶️
        </motion.div>
        <motion.div
          aria-hidden
          initial={{ opacity: 0, rotate: 20 }}
          animate={{ opacity: 1, rotate: 12, y: [0, 12, 0] }}
          transition={{ opacity: { duration: 1, delay: 0.3 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
          className="hidden md:block absolute bottom-32 right-48 text-6xl drop-shadow-2xl select-none"
        >
          🌮
        </motion.div>
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: [0, 8, -8, 0] }}
          transition={{ opacity: { duration: 1, delay: 0.6 }, rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
          className="hidden lg:block absolute top-1/2 right-10 text-5xl select-none"
        >
          🍋
        </motion.div>

        <div className="max-w-6xl mx-auto px-6 py-32 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="h-px w-10 bg-golden" />
            <p className="font-body text-golden font-bold uppercase tracking-[0.25em] text-xs">
              Morristown, NJ · Est. 2021
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-white text-7xl sm:text-8xl md:text-9xl leading-[0.95] mb-8 tracking-tight"
          >
            Fuego<br />
            <span className="text-fuego inline-block">Street</span>{' '}
            <span className="relative inline-block">
              Tacos
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
                className="absolute -bottom-2 left-0 h-2 w-full bg-golden origin-left rounded-full"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-white/75 text-xl md:text-2xl max-w-xl mb-12 leading-relaxed"
          >
            Born on the block. <span className="text-white font-bold">Built for the hungry.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/menu"
              className="group bg-fuego text-white font-body font-bold px-8 py-4 rounded-full text-base shadow-lg shadow-fuego/30 hover:shadow-fuego/50 hover:bg-fuego/90 hover:-translate-y-0.5 transition-all"
            >
              See the Menu{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white/30 text-white font-body font-bold px-8 py-4 rounded-full text-base hover:border-white hover:bg-white/5 transition-all"
            >
              Book a Table
            </Link>
          </motion.div>

          {/* stat row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 flex flex-wrap gap-x-10 gap-y-4 text-white/60 font-body text-sm border-t border-white/10 pt-8"
          >
            <span>
              <span className="text-golden font-bold text-xl mr-2">4.9★</span> on Google
            </span>
            <span>
              <span className="text-golden font-bold text-xl mr-2">200K+</span> tacos served
            </span>
            <span>
              <span className="text-golden font-bold text-xl mr-2">3rd</span> generation recipes
            </span>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────  ZIGZAG DIVIDER  ───────────────────────── */}
      <div className="h-6 bg-cream" style={{ clipPath: zigzagClip }} />

      {/* ─────────────────────────  MARQUEE  ───────────────────────── */}
      <div aria-hidden="true" className="bg-cream border-y-2 border-charcoal/10 overflow-hidden py-4">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((word, i) => (
            <span
              key={i}
              className={`font-display text-3xl mx-6 ${
                word === '★' ? 'text-fuego' : 'text-charcoal'
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────────────────  FEATURED TACOS  ───────────────────────── */}
      <section className="bg-cream py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16 flex items-end justify-between flex-wrap gap-6">
            <div>
              <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-fuego" />
                <p className="font-body text-fuego font-bold uppercase tracking-[0.25em] text-xs">
                  Fan Favorites
                </p>
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="font-display text-5xl md:text-6xl text-charcoal leading-tight">
                The <span className="text-fuego">Must</span>-Orders
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} custom={2} className="font-body text-muted max-w-sm">
              Start here. These three define what we do — and they&apos;re under $6.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED.map((taco, i) => (
              <motion.div
                key={taco.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="group rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow bg-white border border-charcoal/5"
              >
                <div className={`relative h-56 bg-gradient-to-br ${taco.from} ${taco.via} ${taco.to} flex items-center justify-center overflow-hidden`}>
                  {/* dotted overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                      backgroundSize: '14px 14px',
                    }}
                  />
                  <span className="text-8xl drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 select-none">
                    {taco.emoji}
                  </span>
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-charcoal text-[10px] font-body font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    {taco.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2 gap-3">
                    <h3 className="font-display text-2xl text-charcoal leading-tight">{taco.name}</h3>
                    <span className="font-body font-black text-fuego text-xl shrink-0">{taco.price}</span>
                  </div>
                  <p className="font-body text-muted text-sm leading-relaxed">{taco.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 font-body font-bold text-charcoal border-b-2 border-verde pb-1 hover:text-verde hover:gap-3 transition-all"
            >
              View full menu <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────  WHY FUEGO  ───────────────────────── */}
      <section className="bg-fuego py-24 relative overflow-hidden">
        {/* subtle stripe overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #000 0, #000 1px, transparent 0, transparent 40%)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="max-w-6xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="font-body text-white/80 font-bold uppercase tracking-[0.25em] text-xs mb-3">
              Why Fuego
            </p>
            <h2 className="font-display text-white text-4xl md:text-5xl">
              Three reasons it just hits different.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-6">
            {WHY.map((w, i) => (
              <motion.div
                key={w.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="text-center md:px-4 relative"
              >
                {/* divider between columns */}
                {i > 0 && <div className="hidden md:block absolute -left-3 top-4 bottom-4 w-px bg-white/20" />}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur text-5xl mb-5 ring-2 ring-white/20">
                  {w.icon}
                </div>
                <h3 className="font-display text-white text-3xl mb-3">{w.label}</h3>
                <p className="font-body text-white/80 leading-relaxed max-w-xs mx-auto">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────  CTA BANNER  ───────────────────────── */}
      <section className="bg-charcoal py-28 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #F4A261 0, #F4A261 1px, transparent 0, transparent 50%)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-fuego/10 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-2xl mx-auto px-6"
        >
          <p className="font-body text-fuego font-bold uppercase tracking-[0.25em] text-xs mb-5">
            Open 6 days a week · Closed Tuesdays
          </p>
          <h2 className="font-display text-golden text-6xl md:text-7xl mb-6 leading-none">
            Ready to eat?
          </h2>
          <p className="font-body text-white/70 text-lg max-w-md mx-auto mb-10">
            Walk in, grab a stool, or call ahead. We&apos;ll save you the corner booth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="group bg-fuego text-white font-body font-bold px-10 py-4 rounded-full text-base shadow-lg shadow-fuego/40 hover:shadow-fuego/60 hover:-translate-y-0.5 transition-all"
            >
              Book a Table{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href="tel:9735550198"
              aria-label="Call us at (973) 555-0198"
              className="font-body font-bold text-white/80 text-lg hover:text-white transition-colors px-4 py-2"
            >
              or call <span className="text-golden underline underline-offset-4 decoration-golden/50">(973) 555-0198</span>
            </a>
          </div>
        </motion.div>
      </section>
    </>
  )
}
