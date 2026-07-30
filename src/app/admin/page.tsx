"use client"

import { useState, useEffect } from "react"
import StatsCard from "@/components/admin/StatsCard"
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react"
import { formatPrice } from "@/lib/utils"

const months: string[] = []
const revenueData: number[] = []
const maxRev = 1

export default function AdminDashboard() {
  const [stats, setStats] = useState({ revenue: "0", orders: "0", products: "0", users: "0" })

  useEffect(() => {
    async function load() {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          fetch("/api/products?limit=1"),
          fetch("/api/orders"),
          fetch("/api/users"),
        ])
        const productsData = await productsRes.json()
        const ordersData = await ordersRes.json()
        const usersData = await usersRes.json()
        setStats({
          revenue: formatPrice(ordersData.orders?.reduce((sum: number, o: { total: string }) => sum + Number(o.total), 0) || 0),
          orders: String(ordersData.orders?.length || 0),
          products: String(productsData.pagination?.total || 0),
          users: String(usersData.users?.length || 0),
        })
      } catch {}
    }
    load()
  }, [])

  const statCards = [
    { title: "Total Revenue", value: stats.revenue, icon: <DollarSign className="w-5 h-5" />, change: 0, trend: "up" as const },
    { title: "Orders", value: stats.orders, icon: <ShoppingCart className="w-5 h-5" />, change: 0, trend: "up" as const },
    { title: "Products", value: stats.products, icon: <Package className="w-5 h-5" />, change: 0, trend: "up" as const },
    { title: "Users", value: stats.users, icon: <Users className="w-5 h-5" />, change: 0, trend: "up" as const },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-headline-lg font-bold text-on-surface">Dashboard</h1>
        <p className="font-body text-body-md text-outline mt-1">Welcome back! Here&apos;s your store overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <StatsCard key={s.title} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container border-2 border-outline-variant rounded-xl p-6">
          <h2 className="font-display text-headline-md font-bold text-on-surface mb-6">Revenue</h2>
          <div className="flex items-end gap-3 h-40">
            {revenueData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="font-label text-label-sm text-outline">${(val / 1000).toFixed(1)}k</span>
                <div
                  className="w-full rounded-t-md transition-all duration-500"
                  style={{
                    height: `${(val / maxRev) * 100}%`,
                    backgroundColor: i === revenueData.length - 1 ? "var(--color-primary-container)" : "var(--color-primary)",
                    opacity: i === revenueData.length - 1 ? 1 : 0.5,
                  }}
                />
                <span className="font-label text-label-sm text-outline">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container border-2 border-outline-variant rounded-xl p-6">
          <h2 className="font-display text-headline-md font-bold text-on-surface mb-4">Quick Links</h2>
          <div className="space-y-3">
            {[{ label: "Manage Products", href: "/admin/products" }, { label: "View Orders", href: "/admin/orders" }, { label: "Create Offer", href: "/admin/offers" }, { label: "Users", href: "/admin/users" }].map((link) => (
              <a key={link.href} href={link.href} className="block p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 hover:border-primary/40 transition-colors font-body text-body-md text-on-surface hover:text-primary">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
