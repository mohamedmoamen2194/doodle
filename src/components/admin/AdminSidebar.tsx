'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import {
  LayoutDashboard,
  Package,
  Receipt,
  Tag,
  Users,
  ArrowLeftFromLine,
  LogOut,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: Receipt },
  { href: '/admin/offers', label: 'Offers', icon: Tag },
  { href: '/admin/users', label: 'Users', icon: Users },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-surface-container border-r-2 border-outline-variant flex flex-col z-50">
      <div className="p-6 border-b-2 border-outline-variant">
        <Link href="/admin" className="inline-block">
          <span className="font-display text-xl font-bold text-primary tracking-tight">
            DOODLE
          </span>
          <span className="font-label text-label-sm text-outline block -mt-0.5">
            ADMIN
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-body-md transition-all duration-200 group',
                isActive
                  ? 'bg-primary-container/20 text-primary border border-primary-container/30'
                  : 'text-on-surface/70 hover:bg-surface-variant/50 hover:text-on-surface border border-transparent'
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="font-body">{item.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-container" />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t-2 border-outline-variant space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-body-md text-on-surface/50 hover:text-on-surface hover:bg-surface-variant/50 transition-all duration-200"
        >
          <ArrowLeftFromLine className="w-5 h-5" />
          <span className="font-body">Back to Site</span>
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-body-md text-on-surface/50 hover:text-primary hover:bg-primary-container/10 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-body">Logout</span>
        </button>
      </div>
    </aside>
  )
}
