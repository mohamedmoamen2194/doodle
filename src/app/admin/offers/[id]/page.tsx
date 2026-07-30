'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function OfferEditPage() {
  const { id } = useParams()
  const isNew = id === 'new'

  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [discountType, setDiscountType] = useState<'percentage' | 'flat'>('percentage')
  const [discountValue, setDiscountValue] = useState('')
  const [maxUses, setMaxUses] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isActive, setIsActive] = useState(true)

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/offers"
          className="p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-variant transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-headline-lg font-bold text-on-surface">
            {isNew ? 'Create Offer' : 'Edit Offer'}
          </h1>
          <p className="font-body text-body-md text-outline mt-1">
            {isNew ? 'Create a new promotion or discount code' : `Editing offer #${id}`}
          </p>
        </div>
      </div>

      <div className="bg-surface-container border-2 border-outline-variant rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Title">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Summer Sale 20%"
              className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-body text-body-md placeholder:text-outline/40 focus:border-primary outline-none transition-colors"
            />
          </Field>

          <Field label="Code">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. SUMMER20"
              className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-label text-label-sm placeholder:text-outline/40 focus:border-primary outline-none transition-colors"
            />
          </Field>
        </div>

        <Field label="Description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the offer..."
            rows={3}
            className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-body text-body-md placeholder:text-outline/40 focus:border-primary outline-none resize-none transition-colors"
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Discount Type">
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'flat')}
              className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-body text-body-md focus:border-primary outline-none transition-colors"
            >
              <option value="percentage" className="bg-surface-container">Percentage (%)</option>
              <option value="flat" className="bg-surface-container">Flat Amount ($)</option>
            </select>
          </Field>

          <Field label={discountType === 'percentage' ? 'Discount (%)' : 'Discount ($)'}>
            <input
              type="number"
              step="0.01"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder="0"
              className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-label text-label-sm placeholder:text-outline/40 focus:border-primary outline-none transition-colors"
            />
          </Field>
        </div>

        <Field label="Max Uses">
          <input
            type="number"
            value={maxUses}
            onChange={(e) => setMaxUses(e.target.value)}
            placeholder="Unlimited if empty"
            className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-label text-label-sm placeholder:text-outline/40 focus:border-primary outline-none transition-colors"
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Start Date">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-label text-label-sm focus:border-primary outline-none transition-colors [color-scheme:dark]"
            />
          </Field>

          <Field label="End Date">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-label text-label-sm focus:border-primary outline-none transition-colors [color-scheme:dark]"
            />
          </Field>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              className={cn(
                'w-10 h-6 rounded-full border-2 transition-colors relative',
                isActive ? 'bg-secondary border-secondary' : 'bg-transparent border-outline-variant'
              )}
            >
              <div
                className={cn(
                  'w-4 h-4 rounded-full absolute top-0.5 transition-all',
                  isActive ? 'bg-background left-[18px]' : 'bg-outline left-0.5'
                )}
              />
            </div>
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="hidden" />
            <span className="font-body text-body-md text-on-surface">Active</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t-2 border-outline-variant">
        <button
          type="button"
          className="px-6 py-2.5 bg-primary-container text-background rounded-lg font-label text-label-sm uppercase tracking-wider hover:bg-primary-container/90 transition-colors border-2 border-primary-container shadow-hard-sm"
        >
          {isNew ? 'Create Offer' : 'Save Changes'}
        </button>
        <Link
          href="/admin/offers"
          className="px-6 py-2.5 rounded-lg font-label text-label-sm uppercase tracking-wider text-outline hover:text-on-surface transition-colors"
        >
          Cancel
        </Link>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-label text-label-sm text-outline mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}
