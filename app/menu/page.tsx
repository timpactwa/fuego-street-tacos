import type { Metadata } from 'next'
import { TACOS, PLATES, EXTRAS, DRINKS, DESSERTS, type MenuItem } from '@/lib/menu-data'
import { MenuItemCard } from '@/components/MenuItemCard'

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Full menu at Fuego Street Tacos — tacos, plates, drinks, and more in Morristown, NJ.',
}

function MenuSection({
  title,
  items,
  category,
  note,
  accent = 'fuego',
}: {
  title: string
  items: MenuItem[]
  category: string
  note?: string
  accent?: 'fuego' | 'golden' | 'verde'
}) {
  const borderColor = { fuego: 'border-fuego', golden: 'border-golden', verde: 'border-verde' }[accent]
  const headingColor = { fuego: 'text-fuego', golden: 'text-golden', verde: 'text-verde' }[accent]

  return (
    <div className="mb-16">
      <div className={`flex items-baseline gap-4 mb-6 pb-3 border-b-2 ${borderColor}`}>
        <h2 className={`font-display text-4xl ${headingColor}`}>{title}</h2>
        {note && <span className="font-body text-sm text-muted italic">{note}</span>}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map(item => (
          <MenuItemCard
            key={item.name}
            name={item.name}
            description={item.description}
            price={item.price}
            priceNum={item.priceNum}
            category={category}
          />
        ))}
      </div>
    </div>
  )
}

export default function MenuPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero banner */}
      <div className="bg-charcoal py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
          <div className="absolute top-4 left-8 text-5xl">🌶</div>
          <div className="absolute bottom-4 right-12 text-4xl">🌮</div>
          <div className="absolute top-8 right-1/4 text-3xl">🔥</div>
          <div className="absolute bottom-6 left-1/4 text-3xl">🌶</div>
        </div>
        <p className="font-body text-golden font-bold uppercase tracking-widest text-sm mb-3">
          What We&apos;ve Got
        </p>
        <h1 className="font-display text-white text-6xl drop-shadow-sm">The Menu</h1>
        <p className="font-body text-white/50 text-sm mt-4 max-w-xs mx-auto leading-relaxed">
          Everything made fresh. Nothing from a can. No apologies.
        </p>
      </div>

      {/* Menu sections */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <MenuSection title="Tacos 🌮" items={TACOS} category="taco" note="Minimum 2 per order" accent="fuego" />
        <MenuSection title="Plates" items={PLATES} category="plate" accent="golden" />
        <MenuSection title="Extras" items={EXTRAS} category="extra" accent="verde" />
        <MenuSection title="Drinks" items={DRINKS} category="drink" accent="golden" />
        <MenuSection title="Desserts 🍮" items={DESSERTS} category="dessert" accent="fuego" />

        <p className="font-body text-xs text-muted text-center mt-8 leading-relaxed max-w-lg mx-auto">
          Consuming raw or undercooked foods may increase risk of foodborne illness.
          Please inform your server of any allergies.
        </p>
      </div>
    </div>
  )
}
