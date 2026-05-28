'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', party: '2', notes: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', phone: '', date: '', time: '', party: '2', notes: '' })
  }

  const inputClass = "w-full font-body bg-white border-2 border-neutral-200 rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:border-fuego transition-colors"
  const labelClass = "block font-body font-semibold text-charcoal text-sm mb-1.5"

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-charcoal py-20 text-center">
        <p className="font-body text-golden font-bold uppercase tracking-widest text-sm mb-3">Come On In</p>
        <h1 className="font-display text-white text-6xl">Find Us</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        {/* Info */}
        <div>
          <h2 className="font-display text-4xl text-charcoal mb-8">Visit Us</h2>
          <div className="space-y-8">
            <div>
              <p className="font-body font-bold text-fuego uppercase tracking-widest text-xs mb-2">Address</p>
              <p className="font-body text-charcoal">47 South Street<br />Morristown, NJ 07960</p>
            </div>
            <div>
              <p className="font-body font-bold text-fuego uppercase tracking-widest text-xs mb-2">Phone</p>
              <a href="tel:9735550198" aria-label="Call us at (973) 555-0198" className="font-body text-charcoal hover:text-fuego transition-colors">(973) 555-0198</a>
            </div>
            <div>
              <p className="font-body font-bold text-fuego uppercase tracking-widest text-xs mb-2">Hours</p>
              <ul className="font-body text-charcoal space-y-1">
                <li>Monday · 11am – 9pm</li>
                <li className="text-muted line-through">Tuesday · Closed</li>
                <li>Wednesday–Thursday · 11am – 9pm</li>
                <li>Friday–Saturday · 11am – 11pm</li>
                <li>Sunday · 12pm – 8pm</li>
              </ul>
            </div>
          </div>
          {/* Map placeholder */}
          <div className="mt-10 h-52 bg-gradient-to-br from-verde/20 to-fuego/10 rounded-3xl flex items-center justify-center border-2 border-dashed border-verde/30">
            <div className="text-center">
              <p className="text-4xl mb-2">📍</p>
              <p className="font-body text-muted text-sm">47 South Street, Morristown NJ</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="font-display text-4xl text-charcoal mb-8">Book a Table</h2>
          {submitted ? (
            <div className="bg-verde/10 border-2 border-verde rounded-2xl p-8 text-center">
              <p className="text-5xl mb-4">🎉</p>
              <h3 className="font-display text-3xl text-charcoal mb-2">You&apos;re on the list!</h3>
              <p className="font-body text-muted">We&apos;ll call you to confirm your reservation at (973) 555-0198.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="res-name" className={labelClass}>Name</label>
                <input id="res-name" required className={inputClass} placeholder="Your name"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label htmlFor="res-phone" className={labelClass}>Phone</label>
                <input id="res-phone" required type="tel" className={inputClass} placeholder="(973) 555-0000"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="res-date" className={labelClass}>Date</label>
                  <input id="res-date" required type="date" className={inputClass}
                    value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="res-time" className={labelClass}>Time</label>
                  <input id="res-time" required type="time" className={inputClass}
                    value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
                </div>
              </div>
              <div>
                <label htmlFor="res-party" className={labelClass}>Party Size</label>
                <select id="res-party" className={inputClass} value={form.party} onChange={e => setForm({ ...form, party: e.target.value })}>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={String(n)}>{n} {n === 1 ? 'person' : 'people'}</option>)}
                  <option value="9+">9+ people</option>
                </select>
              </div>
              <div>
                <label htmlFor="res-notes" className={labelClass}>Notes (optional)</label>
                <textarea id="res-notes" className={inputClass} rows={3} placeholder="Allergies, special occasions, etc."
                  value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
              </div>
              <button type="submit"
                className="w-full bg-fuego text-white font-body font-bold py-4 rounded-xl hover:bg-fuego/90 transition-colors text-base">
                Request Reservation →
              </button>
              <p className="font-body text-xs text-muted text-center">We&apos;ll call to confirm within 2 hours during business hours.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
