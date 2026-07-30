"use client"

import { useCart } from "@/app/providers"
import type { Product } from "@/lib/types"

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem, items } = useCart()

  const inCart = items.find((i) => i.id === product.id)
  const inCartQty = inCart?.quantity ?? 0

  return (
    <button
      onClick={() =>
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.images[0],
        })
      }
      className="bg-primary-container text-on-primary-container font-body font-bold text-[11px] md:text-label-sm px-3 py-1.5 md:px-4 md:py-2 rounded-xl
                 shadow-hard-sm transition-all duration-200 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                 active:scale-95 whitespace-nowrap shrink-0"
    >
      {inCartQty > 0 ? (
        <span className="flex items-center gap-1.5">
          Got it!
          <span className="bg-on-primary-container/20 text-on-primary-container rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[10px] font-bold">
            {inCartQty}
          </span>
        </span>
      ) : (
        "Gimme!"
      )}
    </button>
  )
}
