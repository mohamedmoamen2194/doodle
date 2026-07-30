"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, Image, FileText, Info } from "lucide-react"
import { useHeroActive } from "@/lib/useHeroActive"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/store", icon: ShoppingBag, label: "Store" },
  { href: "/gallery", icon: Image, label: "Gallery" },
  { href: "/about", icon: Info, label: "About" },
  { href: "/journal", icon: FileText, label: "Journal" },
]

export default function MobileNav() {
  const pathname = usePathname()
  const heroActive = useHeroActive()

  return (
    <nav className={`md:hidden fixed bottom-4 left-4 right-4 z-50 bg-surface-container border-2 border-primary rounded-2xl shadow-hard transition-all duration-500 ${heroActive ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100 translate-y-0"}`}>
      <div className="flex items-center justify-around h-14 px-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0 px-2 py-1 transition-all duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-on-surface/50 hover:text-on-surface/80"
              }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? "fill-primary" : ""}`} />
              <span className="font-label text-[10px] uppercase tracking-wider">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
