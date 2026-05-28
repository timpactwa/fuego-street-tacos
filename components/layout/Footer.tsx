import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/70 font-body">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-2xl text-golden mb-3">Fuego 🌮</p>
          <p className="text-sm leading-relaxed">Born on the block.<br />Built for the hungry.</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-4 uppercase tracking-widest text-xs">Hours</p>
          <ul className="text-sm space-y-1.5">
            <li>Mon–Thu · 11am – 9pm</li>
            <li>Fri–Sat · 11am – 11pm</li>
            <li>Sun · 12pm – 8pm</li>
            <li className="text-fuego">Closed Tuesdays</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-4 uppercase tracking-widest text-xs">Find Us</p>
          <ul className="text-sm space-y-1.5">
            <li>47 South Street</li>
            <li>Morristown, NJ 07960</li>
            <li className="mt-3">
              <a href="tel:9735550198" className="text-golden hover:text-golden/80">(973) 555-0198</a>
            </li>
            <li>
              <a href="mailto:hola@fuegotacos.com" className="text-golden hover:text-golden/80">hola@fuegotacos.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/40">
        © 2025 Fuego Street Tacos ·{' '}
        <Link href="https://render.build" className="text-verde hover:text-verde/80">Site by Render</Link>
      </div>
    </footer>
  )
}
