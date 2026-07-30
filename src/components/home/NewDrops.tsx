"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Pin, Star, Sparkles } from "lucide-react"

type Product = {
  id: string
  slug: string
  name: string
  price: number
  images: string[]
  badges: string[]
}

export default function NewDrops() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products?featured=true&limit=4")
        const data = await res.json()
        setProducts((data.products || []).map((p: { id: string; slug: string; name: string; price: string; images: string[]; badges: string[] }) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          price: Number(p.price),
          images: p.images,
          badges: p.badges,
        })))
      } catch {}
    }
    load()
  }, [])

  const rotations = ["-rotate-1", "rotate-2", "-rotate-1", "rotate-1"]

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 corkboard-bg opacity-60" />
      <div className="absolute inset-0 corkboard-overlay" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-16">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-label text-label-sm text-primary tracking-[0.2em] uppercase">New Drops</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,3.5rem)] leading-tight">
              FRESH OFF THE<br />SKETCHPAD
            </h2>
            <span className="font-label text-label-sm text-outline inline-block mt-2">VOL 04</span>
          </div>
          <Link
            href="/store"
            className="font-body text-body-md text-primary hover:text-primary-container transition-colors inline-flex items-center gap-2 underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
          >
            View All Drops
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, i) => (
              <Link
                key={product.id}
                href={`/store/${product.slug}`}
                className={`group relative bg-surface-container rounded-2xl border-2 border-primary/20 overflow-hidden
                           transition-all duration-300 hover:shadow-hard ${rotations[i % rotations.length]} hover:rotate-0`}
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src={product.images[0] || ""}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {product.badges?.length > 0 ? (
                      <span className="bg-primary-container text-on-primary-container font-label text-label-sm px-3 py-1.5 rounded-full shadow-hard-sm">
                        {product.badges[0]}
                      </span>
                    ) : (
                      <span className="bg-surface-container-high text-on-surface font-label text-label-sm px-3 py-1.5 rounded-full border border-primary/20">
                        NEW
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Pin className="w-4 h-4 text-primary -rotate-45" />
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="font-body text-body-md font-bold text-on-surface group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-label text-label-sm text-primary">${(product.price || 0).toFixed(2)}</span>
                    <Star className="w-3 h-3 text-outline/40" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-surface-container rounded-2xl border-2 border-dashed border-primary/20 p-12 md:p-16 text-center col-span-full">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
              <Pin className="w-8 h-8 text-primary/40 -rotate-45" />
            </div>
            <p className="font-display text-headline-md text-outline/50 mb-2">No drops yet</p>
            <p className="font-body text-body-md text-outline/40 max-w-xs mx-auto">
              New products will appear here once they&apos;re added to the collection.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
