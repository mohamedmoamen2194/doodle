"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Search, ChevronDown, ChevronUp } from "lucide-react"

type User = {
  id: string
  name: string
  email: string
  role: string
  orderCount: number
  createdAt: string
}

export default function AdminUsers() {
  const [search, setSearch] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/users")
        const data = await res.json()
        setUsers(data.users || [])
      } catch {}
    }
    load()
  }, [])

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-headline-lg font-bold text-on-surface">Users</h1>
        <p className="font-body text-body-md text-outline mt-1">Manage customer accounts</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-transparent border-b-2 border-outline-variant text-on-surface placeholder:text-outline/60 font-body text-body-md focus:border-primary outline-none transition-colors"
        />
      </div>

      <div className="bg-surface-container border-2 border-outline-variant rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-outline-variant font-label text-label-sm text-outline uppercase">
                <th className="p-4 w-10" />
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-outline-variant/50 hover:bg-surface-variant/20 transition-colors cursor-pointer"
                  onClick={() => setExpandedId(expandedId === u.id ? null : u.id)}
                >
                  <td className="p-4">
                    {expandedId === u.id ? <ChevronUp className="w-4 h-4 text-outline" /> : <ChevronDown className="w-4 h-4 text-outline" />}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center font-label text-label-sm text-primary shrink-0">
                        {u.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-body text-body-md text-on-surface">{u.name}</p>
                        <p className="font-label text-label-sm text-outline">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "inline-block px-2.5 py-1 rounded-md border text-label-sm font-label",
                      u.role === "admin"
                        ? "bg-primary-container/20 text-primary border-primary-container/30"
                        : "bg-surface-variant text-outline border-outline-variant"
                    )}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 font-label text-label-sm text-on-surface">{u.orderCount}</td>
                  <td className="p-4 font-label text-label-sm text-outline">
                    {new Date(u.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
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
