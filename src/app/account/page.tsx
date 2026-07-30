"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sparkles, Star, Pen, User, Package, ExternalLink, Pencil, MapPin } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    pending: "bg-secondary/20 text-secondary border-secondary/50",
    shipped: "bg-primary-container/20 text-primary-container border-primary-container/50",
    delivered: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/50",
  }
  const color = config[status] || config.pending
  return (
    <span className={`font-label text-label-sm px-3 py-1 rounded-full border-2 ${color} inline-block rotate-1 hover:rotate-0 transition-transform`}>
      {status.toUpperCase()}
    </span>
  )
}

export default function AccountPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<{ id: string; createdAt: string; status: string; total: number }[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/orders")
        const data = await res.json()
        setOrders((data.orders || []).map((o: { id: string; createdAt: string; status: string; total: string }) => ({
          id: o.id,
          createdAt: o.createdAt,
          status: o.status,
          total: Number(o.total),
        })))
      } catch {}
    }
    load()
  }, [])

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0 corkboard-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="doodle-bg-text top-20 -left-16 rotate-12">STUDIO</span>
        <span className="doodle-bg-text bottom-20 -right-16 -rotate-12">ACCOUNT</span>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 md:px-16 py-12 md:py-20">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-label text-label-sm text-primary tracking-[0.2em] uppercase">Your Space</span>
        </div>

        <h1 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-12">
          <span className="doodle-underline">MY STUDIO</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-surface-container rounded-2xl border-2 border-primary/30 p-6 md:p-8 shadow-hard-sm space-y-6 relative">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary-container rounded-full flex items-center justify-center rotate-12">
                <Star className="w-4 h-4 text-on-primary-container" />
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-28 h-28 rounded-full bg-surface-container-high border-4 border-primary/40 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
                  <User className="w-12 h-12 text-primary/60" />
                </div>
                <div>
                  <h2 className="font-display text-headline-md text-on-surface">{user?.name || "Loading..."}</h2>
                  <p className="font-body text-body-md text-outline mt-1">{user?.email}</p>
                </div>
                <button className="inline-flex items-center gap-2 font-label text-label-sm text-primary border-2 border-primary/40 px-4 py-2 rounded-full hover:bg-primary/10 transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                  EDIT PROFILE
                </button>
              </div>

              <div className="border-t-2 border-dashed border-outline-variant pt-4 space-y-2">
                <div className="flex items-center gap-2 font-body text-body-md text-on-surface/70">
                  <MapPin className="w-4 h-4 text-outline" />
                  <span>Your address</span>
                </div>
                <div className="flex items-center gap-2 font-body text-body-md text-on-surface/70">
                  <Package className="w-4 h-4 text-outline" />
                  <span>{orders.length} orders</span>
                </div>
              </div>

              <svg className="w-full h-6 opacity-20" viewBox="0 0 200 20" preserveAspectRatio="none">
                <path d="M2,10 Q30,2 60,10 T120,10 T180,10" stroke="#ffb1c4" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                <circle cx="40" cy="10" r="2" fill="#ffb1c4" />
                <circle cx="140" cy="10" r="2" fill="#fbdae1" />
              </svg>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-primary" />
              <h2 className="font-display text-headline-md text-primary">YOUR ORDERS</h2>
            </div>

            {orders.length === 0 ? (
              <div className="bg-surface-container rounded-2xl border-2 border-dashed border-outline-variant/60 p-12 text-center space-y-4">
                <Package className="w-12 h-12 text-outline/40 mx-auto" />
                <p className="font-body text-body-lg text-on-surface/60">No orders yet</p>
                <Link
                  href="/store"
                  className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-body font-bold text-body-md px-6 py-3 rounded-xl shadow-hard-sm transition-all duration-300 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/account/orders/${order.id}`}
                    className="block bg-surface-container rounded-2xl border-2 border-outline-variant/60 p-5 md:p-6 hover:border-primary/40 transition-all duration-300 group hover:shadow-hard-sm"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-body text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                            {order.id.slice(0, 8)}...
                          </h3>
                          <StatusBadge status={order.status} />
                        </div>
                        <div className="flex items-center gap-4 font-label text-label-sm text-outline">
                          <span>{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-body text-body-lg font-bold text-primary">{formatPrice(order.total)}</span>
                        <ExternalLink className="w-4 h-4 text-outline opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="relative pt-4">
              <svg className="w-full h-8 opacity-15" viewBox="0 0 200 30" preserveAspectRatio="none">
                <path d="M5,15 Q30,5 60,15 T120,15 T180,15" stroke="#ffb1c4" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <circle cx="20" cy="15" r="3" fill="#ffb1c4" />
                <circle cx="100" cy="15" r="2" fill="#fbdae1" />
                <circle cx="160" cy="15" r="3" fill="#ffb1c4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  )
}
