"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Plus, Search } from "lucide-react"

type Offer = {
  id: string
  code: string
  title: string
  discountType: "percentage" | "flat"
  discountValue: number
  isActive: boolean
  usedCount: number
  maxUses: number | null
  startsAt: string
  endsAt: string
}

export default function AdminOffers() {
  const [search, setSearch] = useState("")
  const [offers, setOffers] = useState<Offer[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/offers")
        const data = await res.json()
        setOffers((data.offers || []).map((o: { id: string; code: string; title: string; discountType: string; discountValue: string; isActive: boolean; usedCount: number; maxUses: number | null; startsAt: string; endsAt: string }) => ({
          ...o,
          discountValue: Number(o.discountValue),
        })))
      } catch {}
    }
    load()
  }, [])

  const filtered = offers.filter((o) =>
    o.code.toLowerCase().includes(search.toLowerCase()) ||
    o.title.toLowerCase().includes(search.toLowerCase())
  )

  const toggleActive = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/offers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      })
      setOffers((prev) => prev.map((o) => o.id === id ? { ...o, isActive: !current } : o))
    } catch {}
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-headline-lg font-bold text-on-surface">Offers</h1>
          <p className="font-body text-body-md text-outline mt-1">Manage promotions and discount codes</p>
        </div>
        <Link
          href="/admin/offers/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-container text-background rounded-lg font-label text-label-sm uppercase tracking-wider hover:bg-primary-container/90 transition-colors border-2 border-primary-container shadow-hard-sm"
        >
          <Plus className="w-4 h-4" />
          Create Offer
        </Link>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
        <input
          type="text"
          placeholder="Search offers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-transparent border-b-2 border-outline-variant text-on-surface placeholder:text-outline/60 font-body text-body-md focus:border-primary outline-none transition-colors"
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((offer) => (
          <div
            key={offer.id}
            className="bg-surface-container border-2 border-outline-variant rounded-xl p-5 flex items-center justify-between flex-wrap gap-4"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-surface-bright border border-outline-variant flex items-center justify-center font-label text-label-sm text-primary">
                %
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display text-body-lg font-bold text-on-surface">{offer.title}</span>
                  <code className="font-label text-label-sm bg-surface-variant text-primary px-2 py-0.5 rounded border border-outline-variant">
                    {offer.code}
                  </code>
                </div>
                <p className="font-label text-label-sm text-outline mt-0.5">
                  {offer.discountType === "percentage" ? `${offer.discountValue}% Off` : `$${offer.discountValue} Off`}
                  {" · "}
                  {offer.usedCount}/{offer.maxUses || "∞"} used
                  {" · "}
                  {new Date(offer.startsAt).toLocaleDateString()} → {new Date(offer.endsAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={offer.isActive}
                  onChange={() => toggleActive(offer.id, offer.isActive)}
                  className="sr-only peer"
                />
                <div className={cn(
                  "w-10 h-6 rounded-full border-2 transition-colors relative",
                  offer.isActive ? "bg-secondary border-secondary" : "bg-transparent border-outline-variant"
                )}>
                  <div className={cn(
                    "w-4 h-4 rounded-full absolute top-0.5 transition-all",
                    offer.isActive ? "bg-background left-[18px]" : "bg-outline left-0.5"
                  )} />
                </div>
                <span className="ml-2 font-label text-label-sm text-outline">
                  {offer.isActive ? "Active" : "Inactive"}
                </span>
              </label>

              <div className="flex gap-2">
                <Link
                  href={`/admin/offers/${offer.id}`}
                  className="px-4 py-1.5 rounded-lg border border-outline-variant text-label-sm font-label text-on-surface hover:bg-surface-variant transition-colors"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
