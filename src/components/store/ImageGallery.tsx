"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Pen } from "lucide-react"

export default function ImageGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [selected, setSelected] = useState(0)

  const prev = () => setSelected((s) => (s - 1 + images.length) % images.length)
  const next = () => setSelected((s) => (s + 1) % images.length)

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div className="absolute -inset-2 md:-inset-3 bg-primary/10 rounded-2xl -rotate-2 transition-transform duration-500 group-hover:rotate-0" />
        <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-2xl border-4 border-primary/30 shadow-hard">
          <Image
            src={images[selected]}
            alt={`${name} view ${selected + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 58vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/90"
              >
                <ChevronLeft className="w-5 h-5 text-on-surface" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/90"
              >
                <ChevronRight className="w-5 h-5 text-on-surface" />
              </button>
            </>
          )}
        </div>

        <div className="absolute -top-4 -right-4 w-8 h-8 md:w-12 md:h-12 bg-primary-container rounded-full flex items-center justify-center rotate-12 animate-float shadow-hard-sm">
          <Star className="w-6 h-6 text-on-primary-container" />
        </div>
        <div className="absolute -bottom-3 -left-3 w-8 h-8 md:w-10 md:h-10 bg-secondary rounded-full flex items-center justify-center -rotate-6 animate-float shadow-hard-sm" style={{ animationDelay: "1.2s" }}>
          <Pen className="w-5 h-5 text-on-secondary" />
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === selected
                  ? "border-primary shadow-hard-sm"
                  : "border-outline-variant/30 hover:border-primary/50"
              }`}
            >
              <Image
                src={img}
                alt={`${name} view ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
