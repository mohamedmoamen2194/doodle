import Link from "next/link"
import { ArrowRight, Zap, Leaf, Palette, Sparkles } from "lucide-react"

export default function FeatureGrid() {
  return (
    <section className="relative py-16 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
          <span className="font-label text-[10px] md:text-label-sm text-secondary tracking-[0.2em] uppercase">Why Doodle</span>
        </div>

        <h2 className="font-display text-headline-md md:text-[clamp(2rem,5vw,3rem)] leading-tight mb-8 md:mb-12">
          Built different.<br className="md:hidden" />{" "}
          <span className="text-primary">Obviously</span>.
        </h2>

        <div className="grid md:grid-cols-3 gap-3 md:gap-6">
          <div className="md:col-span-2 bg-surface-container rounded-2xl border-2 border-primary/20 p-4 md:p-12 hover:shadow-hard transition-all duration-300 md:-rotate-[0.5deg] hover:rotate-0 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 opacity-[0.04] pointer-events-none">
              <Palette className="w-full h-full" />
            </div>
            <div className="relative space-y-3 md:space-y-6 max-w-xl">
              <span className="font-label text-[10px] md:text-label-sm text-primary bg-primary/10 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-primary/30 inline-block">
                THE MANIFESTO
              </span>
              <h3 className="font-display text-headline-md md:text-[clamp(1.5rem,3vw,2rem)] leading-tight">
                Designed by artists,<br />for everyone.
              </h3>
              <p className="font-body text-body-sm md:text-body-md text-on-surface/70">
                Every tool we make is tested by actual illustrators, sketchers, and scribblers. 
                If it can&apos;t survive a studio session, it doesn&apos;t ship.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 md:gap-2 font-body text-body-sm md:text-body-md font-bold text-primary hover:text-primary-container transition-colors group/btn"
              >
                Read the story
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="space-y-3 md:space-y-6">
            <div className="bg-surface-container rounded-2xl border-2 border-secondary/20 p-4 md:p-8 hover:shadow-hard transition-all duration-300 md:rotate-1 hover:rotate-0 relative overflow-hidden group">
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-12 h-12 md:w-16 md:h-16 opacity-[0.06] pointer-events-none">
                <Zap className="w-full h-full" />
              </div>
              <div className="relative space-y-2 md:space-y-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-secondary/20 rounded-xl flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                </div>
                <h3 className="font-display text-sm md:text-headline-md">Fast Shipping</h3>
                <p className="font-body text-body-sm md:text-body-md text-on-surface/70">
                  Most orders ship within 24hrs. Because inspiration waits for no one.
                </p>
              </div>
            </div>

            <div className="bg-surface-container rounded-2xl border-2 border-secondary/20 p-4 md:p-8 hover:shadow-hard transition-all duration-300 md:-rotate-1 hover:rotate-0 relative overflow-hidden group">
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-12 h-12 md:w-16 md:h-16 opacity-[0.06] pointer-events-none">
                <Leaf className="w-full h-full" />
              </div>
              <div className="relative space-y-2 md:space-y-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-secondary/20 rounded-xl flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                  <Leaf className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                </div>
                <h3 className="font-display text-sm md:text-headline-md">Eco-Minded</h3>
                <p className="font-body text-body-sm md:text-body-md text-on-surface/70">
                  100% recycled packaging. Carbon-neutral shipping.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-6 bg-gradient-to-br from-surface-container-high to-surface-container rounded-2xl border-2 border-primary/30 p-4 md:p-12 hover:shadow-hard transition-all duration-300 md:rotate-[0.3deg] hover:rotate-0 relative overflow-hidden group">
          <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-24 h-24 md:w-48 md:h-48 opacity-[0.03] pointer-events-none">
            <Palette className="w-full h-full" />
          </div>
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 md:gap-3">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span className="font-label text-[10px] md:text-label-sm text-primary tracking-[0.15em] uppercase">Bundle &amp; Save</span>
              </div>
              <h3 className="font-display text-sm md:text-headline-md md:text-[clamp(1.25rem,3vw,1.75rem)] leading-tight">
                Artist Starter Bundle
              </h3>
              <p className="font-body text-body-sm md:text-body-md text-on-surface/70 max-w-lg">
                Everything you need to go from blank page to finished piece. Save 20% when you buy the kit.
              </p>
            </div>
            <Link
              href="/store/bundle"
              className="inline-flex items-center gap-2 md:gap-3 bg-primary-container text-on-primary-container font-body font-bold text-body-sm md:text-body-md px-4 py-2.5 md:px-8 md:py-4 rounded-xl shadow-hard-sm transition-all duration-300 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] shrink-0 self-start md:self-auto"
            >
              Get the Bundle
              <ArrowRight className="w-3.5 h-3.5 md:w-5 md:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
