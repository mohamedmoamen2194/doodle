export default function TermsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="relative max-w-3xl mx-auto px-4 md:px-16 py-20 md:py-32">
        <h1 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-3">
          Terms
        </h1>
        <p className="font-body text-body-lg text-on-surface/70 mb-16">
          The fine print. We tried to keep it short.
        </p>

        <div className="space-y-10">
          <section className="space-y-3">
            <h2 className="font-display text-headline-md">General</h2>
            <p className="font-body text-body-md text-on-surface/70">
              By using this site, you agree to these terms. If you don&apos;t agree, please close the tab and go sketch something. No hard feelings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-headline-md">Intellectual Property</h2>
            <p className="font-body text-body-md text-on-surface/70">
              All designs, illustrations, and content on this site belong to Doodle Studio. You may not reproduce, distribute, or trace-and-claim-as-your-own anything you find here. Buy the original, support the artist.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-headline-md">Payments</h2>
            <p className="font-body text-body-md text-on-surface/70">
              All transactions are processed securely through Stripe. We don&apos;t store your payment details. Prices are in USD and may include applicable taxes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-headline-md">Limitation of Liability</h2>
            <p className="font-body text-body-md text-on-surface/70">
              We&apos;re not liable for any existential crises caused by our products. That said, if a sketchbook inspires your next masterpiece, we&apos;d love to see it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-headline-md">Contact</h2>
            <p className="font-body text-body-md text-on-surface/70">
              Questions about these terms? Email <span className="font-bold text-primary">legal@doodle.studio</span> and we&apos;ll get back to you faster than you can finish a contour drawing.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
