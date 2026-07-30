"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { use } from "react"
import { Sparkles, Star, ArrowLeft, ShoppingBag, MapPin, Check } from "lucide-react"
import { formatPrice } from "@/lib/utils"

type OrderItem = {
  id: string
  name: string
  quantity: number
  price: number
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [order, setOrder] = useState<{
    id: string
    createdAt: string
    status: string
    total: number
    shippingAddress: { name?: string; address?: string; city?: string; state?: string; zip?: string; country?: string } | null
    items: OrderItem[]
  } | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/orders/${id}`)
        if (!res.ok) return
        const data = await res.json()
        setOrder({
          id: data.id,
          createdAt: data.createdAt,
          status: data.status,
          total: Number(data.total),
          shippingAddress: data.shippingAddress,
          items: (data.items || []).map((i: { id: string; product?: { name: string } | null; quantity: number; price: string }) => ({
            id: i.id,
            name: i.product?.name || "Product",
            quantity: i.quantity,
            price: Number(i.price),
          })),
        })
      } catch {}
    }
    load()
  }, [id])

  if (!order) {
    return (
      <div className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  const statusSteps = [
    { key: "pending", label: "Confirmed", done: ["pending", "shipped", "delivered"].includes(order.status) },
    { key: "shipped", label: "Shipped", done: ["shipped", "delivered"].includes(order.status) },
    { key: "delivered", label: "Delivered", done: order.status === "delivered" },
  ]

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0 corkboard-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="doodle-bg-text top-20 -left-16 rotate-12">ORDER</span>
        <span className="doodle-bg-text bottom-20 -right-16 -rotate-12">DETAILS</span>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 md:px-16 py-12 md:py-20">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-label text-label-sm text-primary tracking-[0.2em] uppercase">Order Details</span>
        </div>

        <h1 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-4">
          <span className="doodle-underline">ORDER #{id.slice(0, 8)}</span>
        </h1>

        <div className="flex items-center gap-3 mb-10">
          <span className="font-label text-label-sm text-outline">
            Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
          <span className="w-1 h-1 rounded-full bg-outline/30" />
          <span className="font-label text-label-sm px-3 py-1 rounded-full border-2 bg-primary-container/20 text-primary-container border-primary-container/50 inline-block">
            {order.status.toUpperCase()}
          </span>
        </div>

        <div className="bg-surface-container rounded-2xl border-2 border-outline-variant/60 p-6 md:p-8 mb-8">
          <h3 className="font-label text-label-sm text-primary uppercase tracking-wider mb-6">Order Progress</h3>
          <div className="relative flex items-start justify-between">
            <div className="absolute top-4 left-0 right-0 h-[2px] bg-outline-variant/40 -z-0" />
            <div
              className="absolute top-4 left-0 h-[2px] bg-primary-container transition-all duration-500 -z-0"
              style={{ width: `${(statusSteps.filter(s => s.done).length / (statusSteps.length - 1)) * 100}%` }}
            />
            {statusSteps.map((step) => (
              <div key={step.key} className="flex flex-col items-center gap-2 relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    step.done
                      ? "bg-primary-container border-primary-container"
                      : "bg-surface-container border-outline-variant"
                  }`}
                >
                  {step.done ? (
                    <Check className="w-4 h-4 text-on-primary-container" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-outline-variant" />
                  )}
                </div>
                <span className={`font-label text-label-sm whitespace-nowrap ${step.done ? "text-on-surface" : "text-outline/50"}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
            <div className="bg-surface-container rounded-2xl border-2 border-outline-variant/60 p-6 md:p-8">
              <h3 className="font-label text-label-sm text-primary uppercase tracking-wider mb-4">Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-surface-container-high border border-outline-variant/30">
                    <div className="w-16 h-16 shrink-0 rounded-xl bg-surface-container border-2 border-outline-variant flex items-center justify-center overflow-hidden">
                      <ShoppingBag className="w-7 h-7 text-outline/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-body-md font-bold text-on-surface">{item.name}</p>
                      <p className="font-label text-label-sm text-outline/60 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-body text-body-md font-bold text-primary shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/account"
              className="inline-flex items-center gap-2 font-body text-body-md text-outline hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Orders
            </Link>
          </div>

          <div className="md:col-span-2 space-y-6">
            {order.shippingAddress && (
              <div className="bg-surface-container rounded-2xl border-2 border-outline-variant/60 p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h3 className="font-label text-label-sm text-primary uppercase tracking-wider">Shipping Address</h3>
                </div>
                <div className="font-body text-body-md text-on-surface space-y-1">
                  <p className="font-bold">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            )}

            <div className="bg-surface-container rounded-2xl border-2 border-outline-variant/60 p-6 md:p-8 space-y-4 shadow-hard-sm">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary-container rounded-full flex items-center justify-center rotate-12">
                <Star className="w-4 h-4 text-on-primary-container" />
              </div>
              <h3 className="font-label text-label-sm text-primary uppercase tracking-wider">Order Totals</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between font-body text-body-md">
                  <span className="text-on-surface/70">Total</span>
                  <span className="text-primary">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            <svg className="w-full h-6 opacity-20" viewBox="0 0 200 20" preserveAspectRatio="none">
              <path d="M2,10 Q30,2 60,10 T120,10 T180,10" stroke="#ffb1c4" strokeWidth="2" fill="none" strokeDasharray="3 3" />
              <circle cx="40" cy="10" r="2" fill="#ffb1c4" />
              <circle cx="140" cy="10" r="2" fill="#fbdae1" />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  )
}
