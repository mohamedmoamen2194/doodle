"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"
import { Sparkles, RotateCcw, Pen } from "lucide-react"

const mediums: { id: string; icon: React.ComponentType<{ className?: string }> }[] = []

const artists: string[] = []

export default function Filters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedMediums = searchParams.getAll("medium")
  const selectedArtists = searchParams.getAll("artist")

  const hasActiveFilters = selectedMediums.length > 0 || selectedArtists.length > 0

  const toggleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const existing = params.getAll(key)

    if (existing.includes(value)) {
      const newValues = existing.filter((v) => v !== value)
      params.delete(key)
      newValues.forEach((v) => params.append(key, v))
    } else {
      params.append(key, value)
    }

    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  const resetFilters = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  return (
    <>
      <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 pb-2">
          {mediums.map((medium) => {
            const isSelected = selectedMediums.includes(medium.id)
            const Icon = medium.icon
            return (
              <button
                key={medium.id}
                onClick={() => toggleFilter("medium", medium.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full border-2 whitespace-nowrap text-xs transition-all font-label ${
                  isSelected
                    ? "border-primary bg-primary/10 text-primary font-bold"
                    : "border-outline-variant/40 text-on-surface/70"
                }`}
              >
                <Icon className="w-3 h-3" />
                {medium.id}
              </button>
            )
          })}
          {artists.map((artist) => {
            const isSelected = selectedArtists.includes(artist)
            return (
              <button
                key={artist}
                onClick={() => toggleFilter("artist", artist)}
                className={`px-3 py-2 rounded-full border-2 whitespace-nowrap text-xs transition-all font-label ${
                  isSelected
                    ? "border-primary-container bg-primary-container/20 text-primary"
                    : "border-outline-variant/40 text-on-surface/60"
                }`}
              >
                {artist}
              </button>
            )
          })}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-3 py-2 rounded-full border-2 border-primary/40 text-primary text-xs whitespace-nowrap font-label"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="hidden md:block sticky top-28 bg-surface-container border-2 border-primary-container rounded-2xl p-6 shadow-hard-sm space-y-8">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h2 className="font-display text-headline-md text-primary">
            Sketchbook Filter
          </h2>
        </div>

        <div className="space-y-4">
          <span className="font-label text-label-sm text-outline tracking-[0.15em] uppercase flex items-center gap-2">
            <Pen className="w-3 h-3" />
            Medium
          </span>
          <div className="space-y-3">
            {mediums.map((medium) => {
              const isSelected = selectedMediums.includes(medium.id)
              const Icon = medium.icon
              return (
                <button
                  key={medium.id}
                  onClick={() => toggleFilter("medium", medium.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all duration-200 font-body text-body-md ${
                    isSelected
                      ? "border-primary bg-primary/10 text-primary font-bold"
                      : "border-outline-variant/40 text-on-surface/70 hover:border-outline-variant hover:text-on-surface"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? "text-primary" : "text-outline/50"}`} />
                  <span>{medium.id}</span>
                  {isSelected && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-primary-container shadow-hard-sm" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <span className="font-label text-label-sm text-outline tracking-[0.15em] uppercase">
            Artist
          </span>
          <div className="flex flex-wrap gap-2">
            {artists.map((artist) => {
              const isSelected = selectedArtists.includes(artist)
              return (
                <button
                  key={artist}
                  onClick={() => toggleFilter("artist", artist)}
                  className={`px-4 py-2 rounded-full border-2 font-label text-label-sm transition-all duration-200 ${
                    isSelected
                      ? "border-primary-container bg-primary-container/20 text-primary shadow-hard-sm"
                      : "border-outline-variant/40 text-on-surface/60 hover:text-on-surface hover:border-outline-variant"
                  }`}
                >
                  {artist}
                </button>
              )
            })}
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="w-full flex items-center justify-center gap-2 font-body text-body-md text-primary border-2 border-primary/40 rounded-xl px-6 py-3 transition-all duration-200 hover:bg-primary/10 hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px]"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Board
          </button>
        )}

        <div className="pt-2 border-t border-outline-variant/20">
          <p className="font-label text-label-sm text-outline/40 text-center">
            filters update live
          </p>
        </div>
      </div>
    </>
  )
}
