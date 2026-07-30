import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Sparkles, Heart, Pen, Camera, MessageCircle, Globe } from "lucide-react"

const categories = ["ALL", "NOTEBOOKS", "POSTERS", "MARKERS", "BUNDLES"]

const galleryItems: { id: string; src: string; span: string; alt: string; label: string; rotate: string }[] = []

export default function GalleryPage() {
  return (
    <div className="flex flex-col">
      <section className="relative py-16 md:py-32 bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <span className="doodle-bg-text top-20 left-0 -translate-x-1/4 rotate-12">DOODLE</span>
          <span className="doodle-bg-text bottom-10 right-0 translate-x-1/4 -rotate-12">VAULT</span>
          <span className="doodle-bg-text top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center rotate-6" style={{ fontSize: "clamp(10rem, 30vw, 24rem)" }}>ART</span>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-16">
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-5 h-5 text-secondary" />
            <span className="font-label text-label-sm text-secondary tracking-[0.2em] uppercase">Visual Archive</span>
          </div>

          <h1 className="font-display text-display-lg md:text-[clamp(3rem,6vw,4.5rem)] leading-tight mb-4">
            THE DOODLE<br />
            <span className="doodle-underline text-primary">VAULT</span>
          </h1>

          <p className="font-body text-body-lg text-on-surface/70 max-w-xl mb-12">
            A living archive of every sketch, splatter, and stroke that made it to the final cut.
          </p>

          <div className="flex flex-wrap gap-3 mb-16 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`font-label text-label-sm uppercase tracking-wider px-4 py-2 md:px-5 md:py-2.5 rounded-full border-2 transition-all duration-300 ${
                  cat === "ALL"
                    ? "bg-primary-container border-primary-container text-background shadow-hard-sm"
                    : "bg-transparent border-outline-variant text-on-surface hover:border-primary hover:text-primary"
                }`}
              >
                {cat === "ALL" ? <><Sparkles className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />{cat}</> : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-24 md:pb-32 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[280px] gap-4 md:gap-6">
            {galleryItems.map((item) => (
              <Link
                key={item.id}
                href={`/gallery/${item.id}`}
                className={`group relative ${item.span} ${item.rotate} hover:rotate-0 transition-all duration-500 overflow-hidden rounded-2xl border-2 border-primary/20 hover:border-primary/60 hover:shadow-hard`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="font-label text-label-sm text-primary bg-primary/10 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/30 mb-2">
                    {item.label}
                  </span>
                  <span className="font-display text-headline-md text-on-surface font-bold">{item.alt}</span>
                  <span className="font-body text-body-md text-primary mt-2 inline-flex items-center gap-1.5">
                    View <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-background/70 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Pen className="w-4 h-4 text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute -left-16 top-1/4 w-32 h-32 pointer-events-none select-none opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" />
            <circle cx="50" cy="50" r="8" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute -right-10 bottom-1/3 w-24 h-24 pointer-events-none select-none opacity-15">
          <svg viewBox="0 0 100 100" className="w-full h-full text-secondary">
            <polygon points="50,5 95,35 77,85 23,85 5,35" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </section>

      <section className="relative py-16 md:py-32 bg-surface-container border-y-4 border-primary overflow-hidden">
        <div className="absolute inset-0 corkboard-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-16 text-center">
          <div className="relative inline-block mb-6">
            <Heart className="w-10 h-10 text-primary animate-float" />
          </div>
          <h2 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-4">
            FOLLOW US
          </h2>
          <p className="font-body text-body-lg text-on-surface/70 max-w-lg mx-auto mb-10">
            Catch daily doodles, studio peeks, and behind-the-scenes chaos.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <Link href="#" className="flex items-center gap-3 bg-background border-2 border-primary/30 rounded-xl px-6 py-3 md:px-8 md:py-4 font-body font-bold text-body-md text-on-surface hover:bg-primary hover:text-background hover:border-primary hover:shadow-hard transition-all duration-300 -rotate-1 hover:rotate-0">
              <Globe className="w-5 h-5" /> Instagram
            </Link>
            <Link href="#" className="flex items-center gap-3 bg-background border-2 border-primary/30 rounded-xl px-6 py-3 md:px-8 md:py-4 font-body font-bold text-body-md text-on-surface hover:bg-primary hover:text-background hover:border-primary hover:shadow-hard transition-all duration-300 rotate-1 hover:rotate-0">
              <Globe className="w-5 h-5" /> Twitter
            </Link>
            <Link href="#" className="flex items-center gap-3 bg-background border-2 border-primary/30 rounded-xl px-6 py-3 md:px-8 md:py-4 font-body font-bold text-body-md text-on-surface hover:bg-primary hover:text-background hover:border-primary hover:shadow-hard transition-all duration-300 -rotate-1 hover:rotate-0">
              <Globe className="w-5 h-5" /> YouTube
            </Link>
            <Link href="#" className="flex items-center gap-3 bg-background border-2 border-primary/30 rounded-xl px-6 py-3 md:px-8 md:py-4 font-body font-bold text-body-md text-on-surface hover:bg-primary hover:text-background hover:border-primary hover:shadow-hard transition-all duration-300 rotate-1 hover:rotate-0">
              <MessageCircle className="w-5 h-5" /> Discord
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {["#SKETCHEVERYDAY", "#DOODLECULTURE", "#STAYKINETIC", "#INKSPLORATION"].map((tag) => (
              <span key={tag} className="font-label text-label-sm text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/30 inline-block">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute -top-6 -left-6 w-16 h-16 pointer-events-none select-none opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
            <path d="M10,50 Q30,10 50,50 Q70,90 90,50" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M10,50 Q30,30 50,50 Q70,70 90,50" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none select-none opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
            <rect x="10" y="10" width="80" height="80" rx="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
            <rect x="25" y="25" width="50" height="50" rx="5" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </section>

      <section className="relative py-16 bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-4 left-[10%] animate-float" style={{ animationDelay: "0s" }}>
            <Star className="w-4 h-4 text-secondary/30" />
          </div>
          <div className="absolute top-20 right-[15%] animate-float" style={{ animationDelay: "1s" }}>
            <Pen className="w-5 h-5 text-primary/20" />
          </div>
          <div className="absolute bottom-10 left-[20%] animate-float" style={{ animationDelay: "2s" }}>
            <Sparkles className="w-4 h-4 text-secondary/30" />
          </div>
          <div className="absolute bottom-16 right-[25%] animate-float" style={{ animationDelay: "0.5s" }}>
            <Star className="w-3 h-3 text-primary/20" />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Camera className="w-6 h-6 text-primary" />
            <span className="font-display text-headline-md">Tag us for a feature</span>
          </div>
          <Link
            href="/store"
            className="inline-flex items-center gap-3 bg-primary-container text-background font-body font-bold text-body-md px-8 py-4 rounded-xl shadow-hard transition-all duration-300 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] shrink-0"
          >
            EXPLORE THE DROP <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
