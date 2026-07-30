import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Clock, Sparkles, Tag, BookOpen, Pen, Star } from "lucide-react"

const categories = ["ALL", "ART", "PROCESS", "CULTURE", "INTERVIEWS", "TIPS"]

const featuredPost: {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  img: string
  author: string
  authorImg: string
} | null = null

const posts: {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  img: string
  author: string
}[] = []

const sidebarCategories: { name: string; count: number }[] = []

const recentPosts: { slug: string; title: string; date: string }[] = []

const tags: string[] = []

export default function JournalPage() {
  return (
    <div className="flex flex-col">
      <section className="relative py-16 md:py-32 bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <span className="doodle-bg-text top-20 left-0 -translate-x-1/4 rotate-12">WORDS</span>
          <span className="doodle-bg-text bottom-10 right-0 translate-x-1/4 -rotate-12">INK</span>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-16">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-5 h-5 text-secondary" />
            <span className="font-label text-label-sm text-secondary tracking-[0.2em] uppercase">Journal</span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,12vw,4.5rem)] md:text-[clamp(3rem,6vw,4.5rem)] leading-tight mb-2 md:mb-4">
            THE<br />
            <span className="doodle-underline text-primary">JOURNAL</span>
          </h1>
          <p className="font-body text-body-md md:text-body-lg text-on-surface/70 max-w-xl mb-6 md:mb-12">
            Notes from the studio. Sketches from the road. Stories from the community.
          </p>

          <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-16 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`font-label text-[10px] md:text-label-sm uppercase tracking-wider px-3 py-1.5 md:px-5 md:py-2.5 rounded-full border-2 transition-all duration-300 shrink-0 ${
                  cat === "ALL"
                    ? "bg-primary-container border-primary-container text-background shadow-hard-sm"
                    : "bg-transparent border-outline-variant text-on-surface hover:border-primary hover:text-primary"
                }`}
              >
                {cat === "ALL" ? <><Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 inline mr-1 md:mr-1.5 -mt-0.5" />{cat}</> : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-16 md:pb-32 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <div className="grid lg:grid-cols-3 gap-6 md:gap-12">
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              {featuredPost ? (
                <Link
                  href={`/journal/${featuredPost.slug}`}
                  className="group block bg-surface-container rounded-2xl border-2 border-primary/20 overflow-hidden hover:shadow-hard transition-all duration-300 -rotate-[0.5deg] hover:rotate-0"
                >
                  <div className="relative aspect-[2/1] overflow-hidden">
                    <Image
                      src={featuredPost.img}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/20 to-transparent" />
                  </div>
                  <div className="p-4 md:p-8 space-y-2 md:space-y-4">
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                      <span className="font-label text-[10px] md:text-label-sm text-background bg-primary-container px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-primary-container shadow-hard-sm">
                        {featuredPost.category}
                      </span>
                      <span className="font-label text-[10px] md:text-label-sm text-outline flex items-center gap-1 md:gap-1.5">
                        <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" /> {featuredPost.date}
                      </span>
                      <span className="font-label text-[10px] md:text-label-sm text-outline flex items-center gap-1 md:gap-1.5">
                        <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" /> {featuredPost.readTime}
                      </span>
                    </div>
                    <h2 className="font-display text-headline-md md:text-headline-lg leading-tight group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="font-body text-body-md md:text-body-lg text-on-surface/70 max-w-2xl line-clamp-2 md:line-clamp-none">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-1 md:pt-2">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-primary/30 shrink-0">
                          <Image src={featuredPost.authorImg} alt="" width={40} height={40} className="object-cover" />
                        </div>
                        <span className="font-body text-label-sm md:text-body-md text-on-surface font-bold">{featuredPost.author}</span>
                      </div>
                      <span className="font-body text-label-sm md:text-body-md text-primary font-bold inline-flex items-center gap-1 md:gap-2 group-hover:underline underline-offset-4 shrink-0">
                        Read <span className="hidden md:inline">More</span> <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-surface-container rounded-2xl border-2 border-dashed border-primary/20 p-16 text-center">
                  <BookOpen className="w-12 h-12 text-outline/30 mx-auto mb-4" />
                  <p className="font-display text-headline-md text-outline/50">No featured post yet</p>
                </div>
              )}

              {posts.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                  {posts.map((post, i) => (
                    <Link
                      key={post.slug}
                      href={`/journal/${post.slug}`}
                      className={`group bg-surface-container rounded-2xl border-2 border-primary/20 overflow-hidden hover:shadow-hard transition-all duration-300 ${
                        i % 3 === 0 ? "md:rotate-1" : i % 3 === 1 ? "md:-rotate-1" : "md:rotate-[0.5deg]"
                      } hover:rotate-0`}
                    >
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <Image
                          src={post.img}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container/60 to-transparent" />
                      </div>
                      <div className="p-2.5 md:p-6 space-y-1 md:space-y-3 border-t-2 border-primary/20 bg-surface-container">
                        <div className="flex items-center gap-1.5 md:gap-2.5 flex-wrap">
                          <span className="font-label text-[9px] md:text-label-sm text-background bg-secondary px-1.5 py-0.5 md:px-2.5 md:py-0.5 rounded-full shadow-hard-sm">
                            {post.category}
                          </span>
                          <span className="font-label text-[9px] md:text-label-sm text-outline flex items-center gap-0.5 md:gap-1">
                            <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" /> {post.date}
                          </span>
                        </div>
                        <h3 className="font-display text-xs md:text-headline-md leading-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="font-body text-sm md:text-body-md text-on-surface/70 line-clamp-1 md:line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-0.5 md:pt-1">
                          <span className="font-label text-[9px] md:text-label-sm text-outline">{post.author}</span>
                          <span className="font-body text-label-sm md:text-body-md text-primary font-bold inline-flex items-center gap-0.5 md:gap-1">
                            Read <ArrowRight className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-surface-container rounded-2xl border-2 border-dashed border-primary/20 p-16 text-center">
                  <Pen className="w-12 h-12 text-outline/30 mx-auto mb-4" />
                  <p className="font-display text-headline-md text-outline/50">No journal entries yet</p>
                  <p className="font-body text-body-md text-outline/40 mt-2">Posts will appear here once published.</p>
                </div>
              )}

              {posts.length > 0 && (
                <nav className="flex items-center justify-center gap-2 md:gap-3 pt-6 md:pt-8 border-t-2 border-primary/20" aria-label="Pagination">
                  <button className="font-label text-[10px] md:text-label-sm bg-surface-container border-2 border-outline-variant rounded-lg md:rounded-xl px-2 py-1.5 md:px-4 md:py-3 text-outline hover:text-primary hover:border-primary transition-colors duration-300 cursor-not-allowed" disabled>
                    Prev
                  </button>
                  <button className="font-label text-[10px] md:text-label-sm bg-primary-container text-background border-2 border-primary-container rounded-lg md:rounded-xl w-7 h-7 md:w-11 md:h-11 shadow-hard-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300">
                    1
                  </button>
                  <button className="font-label text-[10px] md:text-label-sm bg-surface-container border-2 border-outline-variant rounded-lg md:rounded-xl w-7 h-7 md:w-11 md:h-11 text-on-surface hover:border-primary hover:text-primary transition-colors duration-300">
                    2
                  </button>
                  <button className="font-label text-[10px] md:text-label-sm bg-surface-container border-2 border-outline-variant rounded-lg md:rounded-xl w-7 h-7 md:w-11 md:h-11 text-on-surface hover:border-primary hover:text-primary transition-colors duration-300">
                    3
                  </button>
                  <span className="font-label text-[10px] md:text-label-sm text-outline px-1 md:px-2">...</span>
                  <button className="font-label text-[10px] md:text-label-sm bg-surface-container border-2 border-outline-variant rounded-lg md:rounded-xl w-7 h-7 md:w-11 md:h-11 text-on-surface hover:border-primary hover:text-primary transition-colors duration-300">
                    12
                  </button>
                  <button className="font-label text-[10px] md:text-label-sm bg-surface-container border-2 border-outline-variant rounded-lg md:rounded-xl px-2 py-1.5 md:px-4 md:py-3 text-on-surface hover:text-primary hover:border-primary transition-colors duration-300">
                    Next
                  </button>
                </nav>
              )}
            </div>

            <aside className="space-y-4 md:space-y-8 lg:sticky lg:top-8 lg:self-start">
              <div className="bg-surface-container rounded-2xl border-2 border-primary/20 p-4 md:p-8 space-y-2 md:space-y-4">
                <div className="flex items-center gap-2">
                  <Pen className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  <h3 className="font-display text-sm md:text-headline-md">About</h3>
                </div>
                <p className="font-body text-sm md:text-body-md text-on-surface/70">
                  Stories, tips, and dispatches from the Doodle studio.
                </p>
              </div>

              {sidebarCategories.length > 0 && (
                <div className="bg-surface-container rounded-2xl border-2 border-primary/20 p-4 md:p-8 space-y-3 md:space-y-5">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                    <h3 className="font-display text-sm md:text-headline-md">Categories</h3>
                  </div>
                  <ul className="space-y-2 md:space-y-3">
                    {sidebarCategories.map((cat) => (
                      <li key={cat.name}>
                        <Link
                          href={`/journal?category=${cat.name.toLowerCase()}`}
                          className="flex items-center justify-between font-body text-sm md:text-body-md text-on-surface/70 hover:text-primary transition-colors group"
                        >
                          <span className="group-hover:underline underline-offset-4">{cat.name}</span>
                          <span className="font-label text-[10px] md:text-label-sm bg-background px-2 py-0.5 md:px-2.5 md:py-1 rounded-full border border-outline-variant/40 text-outline">
                            {cat.count}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recentPosts.length > 0 && (
                <div className="bg-surface-container rounded-2xl border-2 border-primary/20 p-4 md:p-8 space-y-3 md:space-y-5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    <h3 className="font-display text-sm md:text-headline-md">Recent</h3>
                  </div>
                  <ul className="space-y-2 md:space-y-4">
                    {recentPosts.map((rp) => (
                      <li key={rp.slug}>
                        <Link
                          href={`/journal/${rp.slug}`}
                          className="group flex items-start gap-2 md:gap-3"
                        >
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mt-1.5 md:mt-2 shrink-0 group-hover:scale-150 transition-transform duration-300" />
                          <div>
                            <h4 className="font-body text-sm md:text-body-md font-bold text-on-surface group-hover:text-primary transition-colors">
                              {rp.title}
                            </h4>
                            <span className="font-label text-[10px] md:text-label-sm text-outline">{rp.date}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tags.length > 0 && (
                <div className="bg-surface-container rounded-2xl border-2 border-primary/20 p-4 md:p-8 space-y-3 md:space-y-5">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-primary-container" />
                    <h3 className="font-display text-sm md:text-headline-md">Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/journal?tag=${tag}`}
                        className="font-label text-[9px] md:text-label-sm text-on-surface bg-background border border-outline-variant/40 px-2 py-1 md:px-3 md:py-1.5 rounded-full hover:bg-primary hover:text-background hover:border-primary transition-all duration-300"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br from-primary-container/10 to-surface-container rounded-2xl border-2 border-primary-container/30 p-4 md:p-8 text-center space-y-3 md:space-y-4">
                <h3 className="font-display text-sm md:text-headline-md">Sketchbook Club</h3>
                <p className="font-body text-sm md:text-body-md text-on-surface/70">
                  One sketch a day. Join 2,000+ artists.
                </p>
                <Link
                  href="/sketchbook-club"
                  className="inline-flex items-center gap-2 bg-primary-container text-background font-body font-bold text-sm md:text-body-md px-4 py-2 md:px-6 md:py-3 rounded-xl shadow-hard-sm transition-all duration-300 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  Join Free <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
