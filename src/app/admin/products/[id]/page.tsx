'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Plus, X, Upload, ArrowLeft } from 'lucide-react'
import { cn, slugify, formatPrice } from '@/lib/utils'

type Variant = {
  id: string
  name: string
  sku: string
  price: string
  stock: string
}

type ImagePreview = { id: string; url: string }

const categories: string[] = []

export default function ProductEditPage() {
  const { id } = useParams()
  const isNew = id === 'new'

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [comparePrice, setComparePrice] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [stock, setStock] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [images, setImages] = useState<ImagePreview[]>([])
  const [variants, setVariants] = useState<Variant[]>([])

  const handleNameChange = (val: string) => {
    setName(val)
    if (isNew) setSlug(slugify(val))
  }

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: '', sku: '', price: '', stock: '' },
    ])
  }

  const updateVariant = (vid: string, field: keyof Variant, value: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === vid ? { ...v, [field]: value } : v))
    )
  }

  const removeVariant = (vid: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== vid))
  }

  const addImage = () => {
    const url = prompt('Enter image URL (for demo):')
    if (url) setImages((prev) => [...prev, { id: crypto.randomUUID(), url }])
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-variant transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-headline-lg font-bold text-on-surface">
            {isNew ? 'Add Product' : 'Edit Product'}
          </h1>
          <p className="font-body text-body-md text-outline mt-1">
            {isNew ? 'Create a new product listing' : `Editing product #${id}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container border-2 border-outline-variant rounded-xl p-6 space-y-5">
            <h2 className="font-display text-headline-md font-bold text-on-surface">General</h2>

            <Field label="Product Name">
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Vibrant Notebook A5"
                className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-body text-body-md placeholder:text-outline/40 focus:border-primary outline-none transition-colors"
              />
            </Field>

            <Field label="Slug">
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="product-slug"
                className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-label text-label-sm placeholder:text-outline/40 focus:border-primary outline-none transition-colors"
              />
            </Field>

            <Field label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product..."
                rows={4}
                className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-body text-body-md placeholder:text-outline/40 focus:border-primary outline-none resize-none transition-colors"
              />
            </Field>
          </div>

          <div className="bg-surface-container border-2 border-outline-variant rounded-xl p-6 space-y-5">
            <h2 className="font-display text-headline-md font-bold text-on-surface">Pricing & Inventory</h2>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Price ($)">
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-label text-label-sm placeholder:text-outline/40 focus:border-primary outline-none transition-colors"
                />
              </Field>
              <Field label="Compare Price ($)">
                <input
                  type="number"
                  step="0.01"
                  value={comparePrice}
                  onChange={(e) => setComparePrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-label text-label-sm placeholder:text-outline/40 focus:border-primary outline-none transition-colors"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-body text-body-md focus:border-primary outline-none transition-colors"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-surface-container">{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Stock">
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="0"
                  className="w-full bg-transparent border-b-2 border-outline-variant pb-2 text-on-surface font-label text-label-sm placeholder:text-outline/40 focus:border-primary outline-none transition-colors"
                />
              </Field>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <Toggle checked={isFeatured} onChange={setIsFeatured} label="Featured" />
              <Toggle checked={isActive} onChange={setIsActive} label="Active" />
            </div>
          </div>

          <div className="bg-surface-container border-2 border-outline-variant rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-headline-md font-bold text-on-surface">Variants</h2>
              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-primary hover:bg-primary/10 font-label text-label-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Variant
              </button>
            </div>

            {variants.length === 0 && (
              <p className="font-body text-body-md text-outline">No variants yet. Add size, color, or other options.</p>
            )}

            {variants.map((v) => (
              <div
                key={v.id}
                className="grid grid-cols-5 gap-3 items-end p-4 rounded-lg bg-surface-container-low border border-outline-variant/50"
              >
                <div className="col-span-1">
                  <span className="block font-label text-label-sm text-outline mb-1">Name</span>
                  <input
                    type="text"
                    value={v.name}
                    onChange={(e) => updateVariant(v.id, 'name', e.target.value)}
                    placeholder="e.g. Small"
                    className="w-full bg-transparent border-b-2 border-outline-variant pb-1 text-on-surface font-body text-body-md placeholder:text-outline/40 focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="col-span-1">
                  <span className="block font-label text-label-sm text-outline mb-1">SKU</span>
                  <input
                    type="text"
                    value={v.sku}
                    onChange={(e) => updateVariant(v.id, 'sku', e.target.value)}
                    placeholder="SKU-001"
                    className="w-full bg-transparent border-b-2 border-outline-variant pb-1 text-on-surface font-label text-label-sm placeholder:text-outline/40 focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="col-span-1">
                  <span className="block font-label text-label-sm text-outline mb-1">Price</span>
                  <input
                    type="number"
                    step="0.01"
                    value={v.price}
                    onChange={(e) => updateVariant(v.id, 'price', e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-transparent border-b-2 border-outline-variant pb-1 text-on-surface font-label text-label-sm placeholder:text-outline/40 focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="col-span-1">
                  <span className="block font-label text-label-sm text-outline mb-1">Stock</span>
                  <input
                    type="number"
                    value={v.stock}
                    onChange={(e) => updateVariant(v.id, 'stock', e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent border-b-2 border-outline-variant pb-1 text-on-surface font-label text-label-sm placeholder:text-outline/40 focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeVariant(v.id)}
                    className="p-2 rounded-lg text-primary-container hover:bg-primary-container/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface-container border-2 border-outline-variant rounded-xl p-6 space-y-4">
            <h2 className="font-display text-headline-md font-bold text-on-surface">Images</h2>

            <div className="grid grid-cols-2 gap-3">
              {images.map((img) => (
                <div key={img.id} className="relative aspect-square rounded-lg bg-surface-variant border border-outline-variant overflow-hidden group">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages((prev) => prev.filter((x) => x.id !== img.id))}
                    className="absolute top-1 right-1 p-1 rounded-full bg-background/80 text-primary-container opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImage}
                className="aspect-square rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-1 text-outline hover:text-primary hover:border-primary transition-colors"
              >
                <Upload className="w-5 h-5" />
                <span className="font-label text-label-sm">Upload</span>
              </button>
            </div>
          </div>

          <div className="bg-surface-container border border-outline-variant rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-label text-label-sm text-outline">Preview</p>
                <p className="font-display text-headline-md font-bold text-on-surface mt-1">
                  {price ? formatPrice(price) : '$0.00'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-surface-bright border border-outline-variant flex items-center justify-center font-label text-label-sm text-outline">
                {images.length || '—'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t-2 border-outline-variant">
        <button
          type="button"
          className="px-6 py-2.5 bg-primary-container text-background rounded-lg font-label text-label-sm uppercase tracking-wider hover:bg-primary-container/90 transition-colors border-2 border-primary-container shadow-hard-sm"
        >
          Save Product
        </button>
        <Link
          href="/admin/products"
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

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        className={cn(
          'w-10 h-6 rounded-full border-2 transition-colors relative',
          checked ? 'bg-primary-container border-primary-container' : 'bg-transparent border-outline-variant'
        )}
      >
        <div
          className={cn(
            'w-4 h-4 rounded-full absolute top-0.5 transition-all',
            checked ? 'bg-background left-[18px]' : 'bg-outline left-0.5'
          )}
        />
      </div>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="hidden" />
      <span className="font-body text-body-md text-on-surface">{label}</span>
    </label>
  )
}
