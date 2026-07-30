import Link from "next/link"
import Image from "next/image"
import { Star, Pin, Sparkles } from "lucide-react"
import type { Product } from "@/lib/types"
import AddToCartButton from "./AddToCartButton"

export default function ProductCard({ product }: { product: Product }) {
  const rotations = ["-rotate-1", "rotate-1", "rotate-[0.5deg]", "-rotate-[0.5deg]"]
  const rotation = rotations[product.id.length % rotations.length]

  return (
    <div
      className={`group relative bg-surface-container rounded-2xl border-2 border-primary/20 overflow-hidden
                 transition-all duration-300 hover:shadow-hard ${rotation} hover:rotate-0`}
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className="bg-primary-container text-on-primary-container font-label text-[10px] md:text-label-sm px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full shadow-hard-sm"
            >
              {badge}
            </span>
          ))}
          <span className="bg-surface-container-high/90 text-on-surface font-label text-[10px] md:text-label-sm px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full border border-primary/20 backdrop-blur-sm">
            {product.category?.name || product.medium}
          </span>
        </div>

        <div className="absolute top-3 right-3 w-9 h-9 bg-background/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-hard-sm">
          <Pin className="w-4 h-4 text-primary -rotate-45" />
        </div>

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <Sparkles className="w-5 h-5 text-primary/60 animate-float" />
        </div>
      </div>

      <div className="p-3 md:p-4 space-y-2 md:space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/store/${product.slug}`}>
            <h3 className="font-body text-body-md font-bold text-on-surface group-hover:text-primary transition-colors leading-tight break-words overflow-hidden">
              {product.name}
            </h3>
          </Link>
          <Star className="w-3.5 h-3.5 text-outline/40 shrink-0 mt-0.5" />
        </div>

        <p className="font-label text-label-sm text-outline/60 line-clamp-1">
          {product.medium} &middot; {product.artist}
        </p>

        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="font-body text-body-md font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.comparePrice && (
              <span className="font-label text-[10px] md:text-label-sm text-outline/50 line-through leading-tight">
                ${product.comparePrice.toFixed(2)}
              </span>
            )}
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>

      <div className="absolute -bottom-1 -left-2 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
        <span className="text-2xl text-primary">&bull;</span>
      </div>
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
        <span className="text-lg text-primary">&#10022;</span>
      </div>
    </div>
  )
}
