'use client'

import { useCart } from '@/app/providers'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag, Sparkles, Star, ArrowLeft } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  const shipping = 0
  const grandTotal = totalPrice + shipping

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0 corkboard-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="doodle-bg-text top-20 -left-16 rotate-12">CART</span>
        <span className="doodle-bg-text bottom-20 -right-16 -rotate-12">CHECKOUT</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-16 py-12 md:py-20">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-label text-label-sm text-primary tracking-[0.2em] uppercase">Your Collection</span>
        </div>

        <h1 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-12">
          <span className="doodle-underline">YOUR SKETCHBOOK</span>
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 md:py-32 text-center">
            <div className="relative mb-8">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-surface-container border-4 border-dashed border-primary/40 flex items-center justify-center rotate-6 hover:rotate-0 transition-transform duration-500">
                <ShoppingBag className="w-16 h-16 md:w-20 md:h-20 text-primary/60" />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary-container rounded-full flex items-center justify-center rotate-12 animate-float shadow-hard-sm">
                <Star className="w-5 h-5 text-on-primary-container" />
              </div>
            </div>
            <h2 className="font-display text-headline-md text-primary mb-3">Your sketchbook is empty</h2>
            <p className="font-body text-body-lg text-on-surface/60 mb-8 max-w-md">
              Nothing here yet. Time to make a mess.
            </p>
            <Link
              href="/store"
              className="inline-flex items-center gap-3 bg-primary-container text-on-primary-container font-body font-bold text-body-md px-10 py-5 rounded-xl shadow-hard transition-all duration-300 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              Add Some Chaos
              <Sparkles className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-label text-label-sm text-outline">{totalItems} items rattling around</span>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative bg-surface-container rounded-2xl border-2 border-outline-variant/60 p-4 md:p-6 flex gap-4 md:gap-6 group hover:border-primary/40 transition-colors duration-300"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-xl bg-surface-container-high border-2 border-outline-variant overflow-hidden rotate-1 group-hover:rotate-0 transition-transform duration-300">
                    {item.image ? (
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-outline/40" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-body text-body-md font-bold text-on-surface group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="font-label text-label-sm text-outline mt-0.5">Standard</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-lg bg-surface-container-high border-2 border-outline-variant text-outline hover:text-primary-container hover:border-primary-container transition-all duration-200 hover:rotate-90"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4 md:mt-6">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container-high border-2 border-outline-variant text-on-surface hover:border-primary hover:text-primary transition-all duration-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 h-9 flex items-center justify-center font-label text-label-sm text-on-surface bg-surface-container border-2 border-outline-variant rounded-lg relative">
                          <span className="absolute inset-0 flex items-center justify-center opacity-5 font-display text-xl leading-none pointer-events-none select-none">X</span>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container-high border-2 border-outline-variant text-on-surface hover:border-primary hover:text-primary transition-all duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="font-body text-body-md font-bold text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <Link
                href="/store"
                className="inline-flex items-center gap-2 font-body text-body-md text-outline hover:text-primary transition-colors mt-4 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Continue Doodling
              </Link>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-surface-container rounded-2xl border-2 border-primary/30 p-6 md:p-8 space-y-6 shadow-hard-sm">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary-container rounded-full flex items-center justify-center rotate-12">
                  <Star className="w-4 h-4 text-on-primary-container" />
                </div>

                <h3 className="font-display text-headline-md text-primary">Order Totals</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between font-body text-body-md">
                    <span className="text-on-surface/70">Subtotal ({totalItems} items)</span>
                    <span className="text-on-surface">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between font-body text-body-md">
                    <span className="text-on-surface/70">Shipping</span>
                    <span className="font-label text-label-sm text-secondary uppercase tracking-wider">FREE</span>
                  </div>
                  <div className="border-t-2 border-dashed border-outline-variant pt-3 flex items-center justify-between font-body text-body-lg font-bold">
                    <span className="text-on-surface">Total</span>
                    <span className="text-primary">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full text-center bg-primary-container text-on-primary-container font-body font-bold text-body-md px-8 py-4 rounded-xl shadow-hard transition-all duration-300 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                >
                  CHECKOUT
                </Link>

                <div className="relative pt-4">
                  <svg className="w-full h-8 opacity-20" viewBox="0 0 200 30" preserveAspectRatio="none">
                    <path d="M5,15 Q30,5 60,15 T120,15 T180,15" stroke="#ffb1c4" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                    <circle cx="20" cy="15" r="3" fill="#ffb1c4" />
                    <circle cx="100" cy="15" r="2" fill="#fbdae1" />
                    <circle cx="160" cy="15" r="3" fill="#ffb1c4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  )
}
