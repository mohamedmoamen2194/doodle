export default function ShippingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="relative max-w-3xl mx-auto px-4 md:px-16 py-20 md:py-32">
        <h1 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-3">
          Shipping
        </h1>
        <p className="font-body text-body-lg text-on-surface/70 mb-16">
          We ship everywhere creativity lives.
        </p>
        <div className="bg-surface-container rounded-2xl border-2 border-dashed border-primary/20 p-16 text-center">
          <p className="font-display text-headline-md text-outline/50">Shipping info coming soon</p>
          <p className="font-body text-body-md text-outline/40 mt-2">We&apos;re setting up our shipping details. Check back shortly.</p>
        </div>
      </div>
    </div>
  )
}
