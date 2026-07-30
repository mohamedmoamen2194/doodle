export default function CareersPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="relative max-w-3xl mx-auto px-4 md:px-16 py-20 md:py-32">
        <h1 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-3">
          Careers
        </h1>
        <p className="font-body text-body-lg text-on-surface/70 mb-16">
          Come make a mess with us.
        </p>

        <div className="bg-surface-container rounded-2xl border-2 border-dashed border-primary/20 p-16 text-center">
          <p className="font-display text-headline-md text-outline/50">No open roles right now</p>
          <p className="font-body text-body-md text-outline/40 mt-2">Check back later for new opportunities.</p>
        </div>

        <div className="mt-16 p-6 md:p-8 bg-surface-container rounded-2xl border-2 border-dashed border-primary/30 text-center">
          <p className="font-label text-label-sm text-primary uppercase tracking-wider mb-2">Don&apos;t see a fit?</p>
          <p className="font-body text-body-md text-on-surface/70">
            Send your portfolio and a doodle to <span className="font-bold text-primary">studio@doodle.studio</span>. We&apos;re always looking for fresh hands.
          </p>
        </div>
      </div>
    </div>
  )
}
