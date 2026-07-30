import { RotateCcw, RefreshCw, MessageCircle, CheckCircle } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="relative max-w-3xl mx-auto px-4 md:px-16 py-20 md:py-32">
        <h1 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-3">
          Returns
        </h1>
        <p className="font-body text-body-lg text-on-surface/70 mb-16">
          We stand by our doodles.
        </p>

        <div className="space-y-8">
          <div className="flex gap-4 md:gap-6">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h2 className="font-display text-headline-md">30-Day Returns</h2>
              <p className="font-body text-body-md text-on-surface/70">
                Not happy? Return any item within 30 days of delivery for a full refund. No questions asked — we mean it.
              </p>
            </div>
          </div>

          <div className="flex gap-4 md:gap-6">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h2 className="font-display text-headline-md">Free Exchanges</h2>
              <p className="font-body text-body-md text-on-surface/70">
                Wrong sketchbook size? Prefer a different pen tip size? We&apos;ll swap it free — prepaid label included.
              </p>
            </div>
          </div>

          <div className="flex gap-4 md:gap-6">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h2 className="font-display text-headline-md">Damaged Goods</h2>
              <p className="font-body text-body-md text-on-surface/70">
                If your order arrives with a dent, smudge, or tear, snap a photo and email us. We&apos;ll ship a replacement same day.
              </p>
            </div>
          </div>

          <div className="flex gap-4 md:gap-6">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h2 className="font-display text-headline-md">How to Return</h2>
              <p className="font-body text-body-md text-on-surface/70">
                Pack items in original packaging, include your order number, and drop off at any carrier. Refunds hit your account within 5–7 business days.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 p-6 md:p-8 bg-surface-container rounded-2xl border-2 border-dashed border-primary/30">
          <p className="font-label text-label-sm text-primary uppercase tracking-wider mb-2">Start a Return</p>
          <p className="font-body text-body-md text-on-surface/70">
            Email <span className="font-bold text-primary">returns@doodle.studio</span> with your order number and we&apos;ll take it from there.
          </p>
        </div>
      </div>
    </div>
  )
}
