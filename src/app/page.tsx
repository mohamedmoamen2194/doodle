import ChalkHero from "@/components/home/ChalkHero"
import NewDrops from "@/components/home/NewDrops"
import FeatureGrid from "@/components/home/FeatureGrid"
import { Send, Sparkles } from "lucide-react"

const marqueeItems = [
  "FREE SHIPPING ON ORDERS OVER $50",
  "NEW DROP EVERY MONTH",
  "SKETCHBOOK CLUB — JOIN NOW",
  "LIMITED EDITION INKS",
  "STUDIO SESSIONS EVERY WEEK",
  "FREE SHIPPING ON ORDERS OVER $50",
  "NEW DROP EVERY MONTH",
  "SKETCHBOOK CLUB — JOIN NOW",
  "LIMITED EDITION INKS",
  "STUDIO SESSIONS EVERY WEEK",
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <ChalkHero />
      <NewDrops />

      <section className="relative py-16 md:py-20 bg-surface-container border-y-4 border-primary overflow-hidden">
        <div className="relative flex overflow-x-hidden scrollbar-hide">
          <div className="flex animate-marquee gap-12 whitespace-nowrap py-2">
            {marqueeItems.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3 font-label text-label-sm md:text-[14px] text-on-surface tracking-[0.15em] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                {item}
              </span>
            ))}
          </div>
          <div className="flex animate-marquee gap-12 whitespace-nowrap py-2" aria-hidden="true">
            {marqueeItems.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3 font-label text-label-sm md:text-[14px] text-on-surface tracking-[0.15em] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FeatureGrid />

      <section className="relative py-24 md:py-32 bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <span className="doodle-bg-text top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center rotate-6" style={{ fontSize: "clamp(8rem, 25vw, 20rem)" }}>
            INK
          </span>
        </div>

        <div className="relative max-w-3xl mx-auto px-4 md:px-16 text-center space-y-8">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-label text-label-sm text-primary tracking-[0.2em] uppercase">Newsletter</span>
          </div>

          <h2 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,3.5rem)] leading-tight">
            Stay Inked.
          </h2>

          <p className="font-body text-body-lg text-on-surface/70 max-w-lg mx-auto">
            Be the first to know about new drops, sketchbook tips, and exclusive studio access.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@inbox.com"
              className="flex-1 bg-surface-container border-2 border-outline-variant rounded-xl px-6 py-4 font-body text-body-md text-on-surface placeholder:text-outline/50 focus:outline-none focus:border-primary transition-colors duration-300"
            />
            <button
              type="submit"
              className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-body font-bold text-body-md
                         shadow-hard transition-all duration-300 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center justify-center gap-3 shrink-0"
            >
              Subscribe
              <Send className="w-4 h-4" />
            </button>
          </div>

          <p className="font-label text-label-sm text-outline/50">
            No spam. Just ink. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  )
}
