import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const {} = await params

  return (
    <div className="flex flex-col">
      <article className="relative py-12 md:py-16 bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <span className="doodle-bg-text top-20 -left-20 rotate-12 opacity-[0.04]">SKETCH</span>
          <span className="doodle-bg-text bottom-20 -right-20 -rotate-12 opacity-[0.04]">KINETIC</span>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 md:px-16">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 font-body text-body-md text-on-surface/60 hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Journal
          </Link>

          <div className="py-24 text-center">
            <BookOpen className="w-16 h-16 text-outline/30 mx-auto mb-6" />
            <h1 className="font-display text-headline-lg md:text-display-md text-outline/50 mb-4">
              Article not found
            </h1>
            <p className="font-body text-body-lg text-outline/40 max-w-md mx-auto">
              This journal entry hasn&apos;t been written yet. Check back soon or browse other posts.
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
