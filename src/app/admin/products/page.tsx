"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"

type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "Active" | "Draft"
}

const ITEMS_PER_PAGE = 6

function statusBadge(status: string) {
  return status === "Active"
    ? "bg-secondary/20 text-secondary border-secondary/30"
    : "bg-surface-variant text-outline border-outline-variant"
}

export default function AdminProducts() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState<Product[]>([])
  const [, setTotalPages] = useState(1)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products?limit=100")
        const data = await res.json()
        const mapped: Product[] = (data.products || []).map((p: { id: string; name: string; category?: { name: string } | null; price: string; stock: number; isActive: boolean }) => ({
          id: p.id,
          name: p.name,
          category: p.category?.name || "General",
          price: Number(p.price),
          stock: p.stock,
          status: p.isActive ? "Active" : "Draft",
        }))
        setProducts(mapped)
        setTotalPages(Math.ceil(mapped.length / ITEMS_PER_PAGE))
      } catch {}
    }
    load()
  }, [])

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  const total = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-headline-lg font-bold text-on-surface">Products</h1>
          <p className="font-body text-body-md text-outline mt-1">Manage your product catalog</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-container text-background rounded-lg font-label text-label-sm uppercase tracking-wider hover:bg-primary-container/90 transition-colors border-2 border-primary-container shadow-hard-sm"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          className="w-full pl-10 pr-4 py-2.5 bg-transparent border-b-2 border-outline-variant text-on-surface placeholder:text-outline/60 font-body text-body-md focus:border-primary outline-none transition-colors"
        />
      </div>

      <div className="bg-surface-container border-2 border-outline-variant rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-outline-variant font-label text-label-sm text-outline uppercase">
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p) => (
                <tr key={p.id} className="border-b border-outline-variant/50 hover:bg-surface-variant/20 transition-colors">
                  <td className="p-4">
                    <Link href={`/admin/products/${p.id}`} className="font-body text-body-md text-on-surface hover:text-primary transition-colors">
                      {p.name}
                    </Link>
                  </td>
                  <td className="p-4 font-label text-label-sm text-outline">{p.category}</td>
                  <td className="p-4 font-label text-label-sm text-on-surface">{formatPrice(p.price)}</td>
                  <td className="p-4">
                    <span className={cn("font-label text-label-sm", p.stock === 0 ? "text-primary-container" : "text-on-surface")}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={cn("inline-block px-2.5 py-1 rounded-md border text-label-sm font-label", statusBadge(p.status))}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/products/${p.id}`} className="p-2 rounded-lg text-outline hover:text-primary hover:bg-primary/10 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button type="button" className="p-2 rounded-lg text-outline hover:text-primary-container hover:bg-primary-container/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {total > 1 && (
          <div className="flex items-center justify-between p-4 border-t-2 border-outline-variant">
            <span className="font-label text-label-sm text-outline">Page {page} of {total}</span>
            <div className="flex items-center gap-2">
              <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-variant disabled:opacity-30 disabled:pointer-events-none transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)} className={cn("w-8 h-8 rounded-lg font-label text-label-sm transition-colors", n === page ? "bg-primary-container text-background" : "text-outline hover:text-on-surface hover:bg-surface-variant")}>
                  {n}
                </button>
              ))}
              <button disabled={page >= total} onClick={() => setPage((p) => Math.min(total, p + 1))} className="p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-variant disabled:opacity-30 disabled:pointer-events-none transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
