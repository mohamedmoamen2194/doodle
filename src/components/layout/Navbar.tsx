"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, User, LogOut, Sparkles } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useHeroActive } from "@/lib/useHeroActive"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
]

export default function Navbar() {
  const { user, loading, logout } = useAuth()
  const heroActive = useHeroActive()

  return (
    <nav className={`sticky top-0 z-50 bg-background border-b-4 border-primary shadow-hard transition-opacity duration-500 ${heroActive ? "hidden" : ""}`}>
      <div className="flex items-center justify-between px-4 md:px-16 h-16 md:h-20 max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-block -rotate-2 transition-transform hover:rotate-0 hover:scale-105"
        >
          <Image
            src="/logo.svg"
            alt="Doodle"
            width={140}
            height={63}
            className="h-8 md:h-10 w-auto"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-body text-body-md text-on-surface hover:text-primary transition-all duration-300
                         after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-0 after:bg-primary after:rounded-full
                         hover:after:w-full after:transition-all after:duration-300 hover:-rotate-2 inline-block"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <Link
            href="/cart"
            className="relative p-2 text-on-surface hover:text-primary transition-colors group"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary-container rounded-full group-hover:scale-125 transition-transform" />
          </Link>

          {loading ? (
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-outline/20 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-2 md:gap-3">
              <Link
                href={user.role === "admin" ? "/admin" : "/account"}
                className="flex items-center gap-2 p-2 text-on-surface hover:text-primary transition-colors group"
              >
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary-container/30 flex items-center justify-center">
                  <span className="font-label text-[10px] md:text-label-sm text-primary font-bold">
                    {user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="hidden md:inline font-body text-body-sm text-on-surface/70 group-hover:text-primary transition-colors">
                  {user.name.split(" ")[0]}
                </span>
                {user.role === "admin" && (
                  <Sparkles className="w-3 h-3 text-primary-container" />
                )}
              </Link>
              <button
                onClick={logout}
                className="p-2 text-outline hover:text-primary transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="p-2 text-on-surface hover:text-primary transition-colors"
            >
              <User className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
