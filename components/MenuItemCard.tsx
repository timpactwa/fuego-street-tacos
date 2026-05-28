'use client'
import { useCart } from '@/lib/cart-context'

type Props = {
  name: string
  description: string
  price: string
  priceNum: number
  category: string
}

export function MenuItemCard({ name, description, price, priceNum, category }: Props) {
  const { items, addItem, updateQuantity } = useCart()
  const cartItem = items.find(i => i.name === name)
  const qty = cartItem?.quantity ?? 0

  return (
    <div className="group flex justify-between gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="min-w-0">
        <p className="font-body font-bold text-charcoal leading-tight">{name}</p>
        {description && (
          <p className="font-body text-sm text-muted mt-1 leading-snug">{description}</p>
        )}
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <div className="flex items-center gap-1.5 pt-0.5">
          <span className="w-2 h-2 rounded-full bg-verde opacity-70" />
          <p className="font-body font-black text-fuego text-base tabular-nums">{price}</p>
        </div>
        {qty === 0 ? (
          <button
            onClick={() => addItem({ name, price: priceNum, category })}
            className="text-xs font-body font-bold text-white bg-fuego px-3 py-1 rounded-full hover:bg-fuego/90 active:scale-95 transition-all"
          >
            + Add
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateQuantity(name, qty - 1)}
              className="w-6 h-6 rounded-full bg-fuego/10 text-fuego font-bold text-sm flex items-center justify-center hover:bg-fuego/20 active:scale-95 transition-all"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="font-body font-bold text-charcoal text-sm w-5 text-center tabular-nums">
              {qty}
            </span>
            <button
              onClick={() => updateQuantity(name, qty + 1)}
              className="w-6 h-6 rounded-full bg-fuego text-white font-bold text-sm flex items-center justify-center hover:bg-fuego/90 active:scale-95 transition-all"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
