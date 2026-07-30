"use client"

import { useState, useEffect } from "react"
import { cn, formatPrice } from "@/lib/utils"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled"

type OrderItem = { name: string; qty: number; price: number }

type Order = {
  id: string
  customer: string
  email: string
  date: string
  total: number
  status: OrderStatus
  items: OrderItem[]
}

const statuses: OrderStatus[] = ["pending", "shipped", "delivered", "cancelled"]

const statusColor: Record<OrderStatus, string> = {
  delivered: "bg-secondary/20 text-secondary border-secondary/30",
  shipped: "bg-primary/20 text-primary border-primary/30",
  pending: "bg-surface-variant text-outline border-outline-variant",
  cancelled: "bg-primary-container/20 text-primary-container border-primary-container/30",
}

export default function AdminOrders() {
  const [filter, setFilter] = useState<OrderStatus | "All">("All")
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/orders")
        const data = await res.json()
        const mapped: Order[] = (data.orders || []).map((o: { id: string; userId: string; total: string; status: string; shippingAddress: unknown; createdAt: string }) => ({
          id: o.id,
          customer: o.userId || "Unknown",
          email: "",
          date: new Date(o.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
          total: Number(o.total),
          status: o.status as OrderStatus,
          items: [],
        }))
        setOrders(mapped)
      } catch {}
    }
    load()
  }, [])

  const filtered = orders
    .filter((o) => filter === "All" || o.status === filter)
    .filter((o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
    )

  const updateStatus = async (id: string, status: OrderStatus) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o))
    } catch {}
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-headline-lg font-bold text-on-surface">Orders</h1>
        <p className="font-body text-body-md text-outline mt-1">Track and manage customer orders</p>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          {["All", ...statuses].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s as OrderStatus | "All")}
              className={cn(
                "px-4 py-1.5 rounded-lg font-label text-label-sm uppercase tracking-wider border transition-colors",
                filter === s
                  ? "bg-primary-container/20 text-primary border-primary-container/30"
                  : "text-outline border-transparent hover:text-on-surface hover:border-outline-variant"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56 pl-10 pr-4 py-2 bg-transparent border-b-2 border-outline-variant text-on-surface placeholder:text-outline/40 font-body text-body-md focus:border-primary outline-none transition-colors"
          />
        </div>
      </div>

      <div className="bg-surface-container border-2 border-outline-variant rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-outline-variant font-label text-label-sm text-outline uppercase">
                <th className="p-4 w-10" />
                <th className="p-4">Order</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-outline-variant/50 hover:bg-surface-variant/20 transition-colors">
                  <td className="p-4">
                    <button onClick={() => setExpanded(expanded === o.id ? null : o.id)}>
                      {expanded === o.id ? <ChevronUp className="w-4 h-4 text-outline" /> : <ChevronDown className="w-4 h-4 text-outline" />}
                    </button>
                  </td>
                  <td className="p-4 font-label text-label-sm text-on-surface">{o.id.slice(0, 8)}</td>
                  <td className="p-4">
                    <p className="font-body text-body-md text-on-surface">{o.customer}</p>
                  </td>
                  <td className="p-4 font-label text-label-sm text-outline">{o.date}</td>
                  <td className="p-4 font-label text-label-sm text-on-surface">{formatPrice(o.total)}</td>
                  <td className="p-4">
                    <span className={cn("inline-block px-2.5 py-1 rounded-md border text-label-sm font-label", statusColor[o.status])}>
                      {o.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-transparent border border-outline-variant rounded-lg px-2 py-1 text-label-sm font-label text-on-surface focus:border-primary outline-none"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s} className="bg-surface-container">{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
