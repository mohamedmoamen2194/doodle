'use client'

import { useCart } from '@/app/providers'
import Link from 'next/link'
import { useState } from 'react'
import { Sparkles, Star, ArrowLeft, ShoppingBag, CreditCard } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function CheckoutPage() {
  const { items, totalPrice, totalItems } = useCart()
  const [agreeTerms, setAgreeTerms] = useState(false)

  const shipping = 0
  const grandTotal = totalPrice + shipping

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0 corkboard-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="doodle-bg-text top-10 -left-12 rotate-12">CHECKOUT</span>
        <span className="doodle-bg-text bottom-10 -right-12 -rotate-12">PAYMENT</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-16 py-12 md:py-20">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-label text-label-sm text-primary tracking-[0.2em] uppercase">Secure Checkout</span>
        </div>

        <h1 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-12">
          <span className="doodle-underline">FINALIZE YOUR MASTERPIECE</span>
        </h1>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3 space-y-8">
            <section className="bg-surface-container rounded-2xl border-2 border-outline-variant/60 p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shadow-hard-sm">
                  <span className="font-label text-label-sm font-bold text-on-primary-container">1</span>
                </div>
                <h2 className="font-display text-headline-md text-primary">YOUR INK</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-label text-label-sm text-on-surface/70 mb-1.5 tracking-wider uppercase">Full Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full bg-transparent border-b-2 border-outline-variant pb-2 font-body text-body-md text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary-container transition-colors duration-300"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-label text-label-sm text-on-surface/70 mb-1.5 tracking-wider uppercase">Email</label>
                  <input
                    type="email"
                    placeholder="jane@studio.com"
                    className="w-full bg-transparent border-b-2 border-outline-variant pb-2 font-body text-body-md text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary-container transition-colors duration-300"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-label text-label-sm text-on-surface/70 mb-1.5 tracking-wider uppercase">Address</label>
                  <input
                    type="text"
                    placeholder="123 Sketch Lane"
                    className="w-full bg-transparent border-b-2 border-outline-variant pb-2 font-body text-body-md text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary-container transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block font-label text-label-sm text-on-surface/70 mb-1.5 tracking-wider uppercase">City</label>
                  <input
                    type="text"
                    placeholder="Portland"
                    className="w-full bg-transparent border-b-2 border-outline-variant pb-2 font-body text-body-md text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary-container transition-colors duration-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label text-label-sm text-on-surface/70 mb-1.5 tracking-wider uppercase">ZIP</label>
                    <input
                      type="text"
                      placeholder="97201"
                      className="w-full bg-transparent border-b-2 border-outline-variant pb-2 font-body text-body-md text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary-container transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block font-label text-label-sm text-on-surface/70 mb-1.5 tracking-wider uppercase">Country</label>
                    <input
                      type="text"
                      placeholder="USA"
                      className="w-full bg-transparent border-b-2 border-outline-variant pb-2 font-body text-body-md text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary-container transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface-container rounded-2xl border-2 border-outline-variant/60 p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shadow-hard-sm">
                  <span className="font-label text-label-sm font-bold text-on-primary-container">2</span>
                </div>
                <h2 className="font-display text-headline-md text-primary">PAPER TYPE</h2>
              </div>

              <div className="p-6 rounded-xl bg-surface-container-high border-2 border-dashed border-outline-variant/50 text-center space-y-3">
                <CreditCard className="w-10 h-10 text-outline/50 mx-auto" />
                <p className="font-body text-body-md text-outline/70">
                  Payment integration coming soon
                </p>
                <p className="font-label text-label-sm text-outline/40">
                  Your canvas won&apos;t be charged yet
                </p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  className={`w-6 h-6 shrink-0 mt-0.5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                    agreeTerms
                      ? 'bg-primary-container border-primary-container'
                      : 'border-outline-variant group-hover:border-primary'
                  }`}
                  onClick={() => setAgreeTerms(!agreeTerms)}
                >
                  {agreeTerms && (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-on-primary-container" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M4,12 L10,18 L20,6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="font-body text-body-md text-on-surface/70 group-hover:text-on-surface transition-colors">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary underline decoration-primary/30 hover:decoration-primary">
                    terms of service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary underline decoration-primary/30 hover:decoration-primary">
                    privacy policy
                  </Link>
                </span>
              </label>
            </section>

            <Link
              href="/cart"
              className="inline-flex items-center gap-2 font-body text-body-md text-outline hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Cart
            </Link>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-28 bg-surface-container rounded-2xl border-2 border-primary/30 p-6 md:p-8 space-y-6 shadow-hard-sm">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary-container rounded-full flex items-center justify-center rotate-12">
                <Star className="w-4 h-4 text-on-primary-container" />
              </div>

              <h3 className="font-display text-headline-md text-primary">Order Summary</h3>

              <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-high border border-outline-variant/30">
                    <div className="w-12 h-12 shrink-0 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                      ) : (
                        <ShoppingBag className="w-5 h-5 text-outline/40" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-body-md font-bold text-on-surface truncate">{item.name}</p>
                      <p className="font-label text-label-sm text-outline">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-body text-body-md font-bold text-primary shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t-2 border-dashed border-outline-variant">
                <div className="flex items-center justify-between font-body text-body-md">
                  <span className="text-on-surface/70">Subtotal</span>
                  <span className="text-on-surface">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between font-body text-body-md">
                  <span className="text-on-surface/70">Shipping</span>
                  <span className="font-label text-label-sm text-secondary uppercase tracking-wider">FREE</span>
                </div>
                <div className="flex items-center justify-between font-body text-body-lg font-bold pt-2 border-t-2 border-outline-variant">
                  <span className="text-on-surface">Total</span>
                  <span className="text-primary">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                disabled={!agreeTerms}
                className={`w-full text-center font-body font-bold text-body-md px-8 py-4 rounded-xl transition-all duration-300 ${
                  agreeTerms
                    ? 'bg-primary-container text-on-primary-container shadow-hard hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]'
                    : 'bg-surface-container-high text-outline/50 cursor-not-allowed border-2 border-outline-variant'
                }`}
              >
                PLACE ORDER
              </button>

              <div className="relative pt-2">
                <svg className="w-full h-6 opacity-20" viewBox="0 0 200 20" preserveAspectRatio="none">
                  <path d="M2,10 Q30,2 60,10 T120,10 T180,10" stroke="#a8cec5" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                  <circle cx="40" cy="10" r="2" fill="#a8cec5" />
                  <circle cx="140" cy="10" r="2" fill="#a8cec5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  )
}
