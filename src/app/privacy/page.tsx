export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="relative max-w-3xl mx-auto px-4 md:px-16 py-20 md:py-32">
        <h1 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-3">
          Privacy
        </h1>
        <p className="font-body text-body-lg text-on-surface/70 mb-16">
          We respect your data as much as we respect a clean line.
        </p>

        <div className="space-y-10">
          <section className="space-y-3">
            <h2 className="font-display text-headline-md">What We Collect</h2>
            <p className="font-body text-body-md text-on-surface/70">
              We collect only what you give us: your name, email, shipping address, and payment info (processed securely by Stripe). We also collect basic analytics — page views, clicks, and referral sources — to make the experience less broken.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-headline-md">What We Don&apos;t Do</h2>
            <p className="font-body text-body-md text-on-surface/70">
              We don&apos;t sell your data. We don&apos;t spam your inbox. We don&apos;t share your info with third parties beyond what&apos;s necessary to ship your order (carriers, payment processors).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-headline-md">Cookies</h2>
            <p className="font-body text-body-md text-on-surface/70">
              We use a minimal set of cookies — session tokens for cart persistence and a tiny analytics cookie. No creepy tracking networks. No retargeting pixel farms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-headline-md">Your Rights</h2>
            <p className="font-body text-body-md text-on-surface/70">
              You can request a copy of your data or ask us to delete it at any time. Email <span className="font-bold text-primary">privacy@doodle.studio</span> and we&apos;ll handle it within 14 days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-headline-md">Changes</h2>
            <p className="font-body text-body-md text-on-surface/70">
              If we ever update this policy, we&apos;ll announce it on the site and give you a heads-up via email if you&apos;re on the list.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
