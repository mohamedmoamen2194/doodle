"use client"

import { useState } from "react"
import ProductCard from "./ProductCard"
import type { Product } from "@/lib/types"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS_PER_PAGE = 6

export default function ProductGrid({ products }: { products: Product[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const start = (safePage - 1) * ITEMS_PER_PAGE
  const visible = products.slice(start, start + ITEMS_PER_PAGE)

  return (
    <div className="space-y-10 pb-20 md:pb-0">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="font-body text-body-md text-on-surface/80 border-2 border-outline-variant/50 rounded-xl px-4 py-2.5
                       transition-all duration-200 hover:border-primary hover:text-primary hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-hard-sm
                       disabled:opacity-30 disabled:pointer-events-none flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl font-label text-label-sm transition-all duration-200 ${
                  page === safePage
                    ? "bg-primary-container text-on-primary-container shadow-hard-sm"
                    : "text-on-surface/60 border-2 border-outline-variant/30 hover:border-primary hover:text-primary"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="font-body text-body-md text-on-surface/80 border-2 border-outline-variant/50 rounded-xl px-4 py-2.5
                       transition-all duration-200 hover:border-primary hover:text-primary hover:translate-x-[2px] hover:-translate-y-[2px] hover:shadow-hard-sm
                       disabled:opacity-30 disabled:pointer-events-none flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
