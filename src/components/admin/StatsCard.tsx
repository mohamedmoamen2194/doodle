'use client'

import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'
import type { ReactNode } from 'react'

type StatsCardProps = {
  title: string
  value: string
  icon: ReactNode
  change?: number
  trend?: 'up' | 'down'
}

export default function StatsCard({ title, value, icon, change, trend }: StatsCardProps) {
  return (
    <div className="relative bg-surface-container border-2 border-outline-variant rounded-xl p-5 overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-primary">
          <path d="M0 0 L100 0 L100 100" stroke="currentColor" strokeWidth="4" />
          <circle cx="20" cy="20" r="6" fill="currentColor" />
          <circle cx="50" cy="10" r="4" fill="currentColor" />
          <circle cx="80" cy="30" r="5" fill="currentColor" />
          <path d="M10 80 Q30 60 50 70 Q70 80 90 50" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="flex items-start justify-between mb-3">
        <span className="text-label-sm tracking-widest uppercase text-outline font-label">{title}</span>
        <span className="text-primary-container">{icon}</span>
      </div>

      <div className="text-headline-md font-display font-bold text-on-surface mb-1">{value}</div>

      {change !== undefined && (
        <div className={cn(
          'flex items-center gap-1 text-label-sm font-label',
          trend === 'up' ? 'text-secondary' : 'text-primary'
        )}>
          {trend === 'up' ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          <span>{Math.abs(change)}% from last month</span>
        </div>
      )}
    </div>
  )
}
