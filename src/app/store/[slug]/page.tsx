import Link from "next/link"
import { notFound } from "next/navigation"
import { db, schema } from "@/lib/db"
import { eq, and, ne } from "drizzle-orm"
import { ArrowLeft, Star, Pin, Sparkles, Palette, Pen, Hand } from "lucide-react"
import ProductCard from "@/components/store/ProductCard"
import ImageGallery from "@/components/store/ImageGallery"
import type { Product } from "@/lib/types"

function mapProduct(row: { products: typeof schema.products.$inferSelect; categories: typeof schema.categories.$inferSelect | null }): Product {
  return {
    id: row.products.id,
    name: row.products.name,
    slug: row.products.slug,
    price: Number(row.products.price),
    comparePrice: row.products.comparePrice ? Number(row.products.comparePrice) : null,
    images: row.products.images as string[],
    category: row.categories ? { id: row.categories.id, name: row.categories.name, slug: row.categories.slug } : null,
    badges: row.products.badges as string[],
    description: row.products.description,
    specs: row.products.specs as { label: string; value: string }[],
    artist: row.products.artist,
    medium: row.products.medium,
    stock: row.products.stock,
    isFeatured: row.products.isFeatured,
  }
}

async function findProduct(slug: string) {
  const [result] = await db
    .select()
    .from(schema.products)
    .leftJoin(schema.categories, eq(schema.products.categoryId, schema.categories.id))
    .where(eq(schema.products.slug, slug))

  if (!result) return null
  return mapProduct(result)
}

async function getRelated(product: Product) {
  const rows = await db
    .select()
    .from(schema.products)
    .leftJoin(schema.categories, eq(schema.products.categoryId, schema.categories.id))
    .where(and(eq(schema.products.isActive, true), ne(schema.products.id, product.id)))
    .limit(3)

  return rows.map(mapProduct)
}

export default async function ProductDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const product = await findProduct(slug)

  if (!product) notFound()

  const related = await getRelated(product)

  const refCode = `SKU-${product.slug.split("-").map((s) => s.toUpperCase().slice(0, 3)).join("")}-${String(product.price * 7).padStart(4, "0")}`

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none" style={{
        backgroundImage: `
          radial-gradient(circle, rgba(168, 206, 197, 0.04) 1.5px, transparent 1.5px)
        `,
        backgroundSize: "28px 28px",
      }} />

      <div className="absolute inset-0 pointer-events-none select-none">
        <Palette className="absolute top-40 left-[3%] w-16 h-16 text-primary/5 -rotate-12" />
        <Pen className="absolute top-80 right-[5%] w-20 h-20 text-secondary/5 rotate-12" />
        <Hand className="absolute bottom-60 left-[8%] w-14 h-14 text-primary/5 -rotate-6" />
        <Star className="absolute top-56 left-[40%] w-6 h-6 text-primary/10 animate-float" />
        <Sparkles className="absolute top-32 right-[30%] w-5 h-5 text-secondary/10 animate-float" style={{ animationDelay: "0.8s" }} />
        <span className="doodle-bg-text top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">
          SKETCH
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-16 py-8 md:py-20">
        <nav className="mb-10">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 font-body text-body-md text-on-surface/60 hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="border-b border-dashed border-outline-variant/50 group-hover:border-primary">
              Back to Store
            </span>
          </Link>
        </nav>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-7">
            <ImageGallery images={product.images} name={product.name} />
          </div>

          <div className="md:col-span-5 md:sticky md:top-28 self-start space-y-8">
            <div className="flex flex-wrap items-start gap-3 mb-2">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className="bg-primary-container text-on-primary-container font-label text-label-sm px-4 py-1.5 rounded-full shadow-hard-sm"
                >
                  {badge}
                </span>
              ))}
              <span className="bg-surface-container-high text-on-surface font-label text-label-sm px-4 py-1.5 rounded-full border border-primary/20">
                {product.category?.name || product.medium || "General"}
              </span>
            </div>

            <div>
              <h1 className="font-display text-headline-lg md:text-[clamp(2rem,4vw,42px)] leading-tight">
                {product.name}
              </h1>
              <p className="font-label text-label-sm text-outline/60 mt-2">
                Ref: {refCode}
              </p>
            </div>

            <div className="relative border-2 border-dashed border-primary/30 rounded-2xl p-4 md:p-6 bg-surface-container-low">
              <span className="absolute -top-3 left-4 bg-background px-3 font-label text-label-sm text-primary tracking-[0.1em]">
                Artist Choice
              </span>
              <p className="font-body text-body-md text-on-surface/80 leading-relaxed italic">
                &ldquo;{product.description}&rdquo;
              </p>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-outline-variant/20">
                <Palette className="w-4 h-4 text-primary" />
                <span className="font-label text-label-sm text-primary">{product.artist}</span>
                <span className="text-outline/30 mx-1">&middot;</span>
                <Pen className="w-4 h-4 text-secondary" />
                <span className="font-label text-label-sm text-secondary">{product.medium}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-[clamp(2rem,10vw,72px)] text-primary leading-none">
                ${product.price.toFixed(2)}
              </span>
              {product.comparePrice && (
                <span className="font-body text-body-lg text-outline/50 line-through">
                  ${product.comparePrice.toFixed(2)}
                </span>
              )}
              {product.comparePrice && (
                <span className="bg-primary-container/30 text-primary font-label text-label-sm px-3 py-1 rounded-full border border-primary/40">
                  Save ${(product.comparePrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <button
              className="w-full bg-primary-container text-on-primary-container font-body font-bold text-body-lg px-6 py-4 md:px-8 md:py-5 rounded-2xl
                         shadow-hard transition-all duration-300 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]
                         active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden group/btn"
            >
              <span className="relative z-10 flex items-center gap-3">
                Grab the Goods
                <Sparkles className="w-5 h-5" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-on-primary-container/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            </button>

            <div className="space-y-3">
              <span className="font-label text-label-sm text-outline/60 tracking-[0.15em] uppercase flex items-center gap-2">
                <Pin className="w-3 h-3" />
                Specs
              </span>
              <div className="grid grid-cols-2 gap-2">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 space-y-1"
                  >
                    <span className="font-label text-label-sm text-outline/50 uppercase tracking-wider block">
                      {spec.label}
                    </span>
                    <span className="font-body text-body-md font-bold text-on-surface block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 border-t border-outline-variant/20">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-background flex items-center justify-center"
                  >
                    <span className="font-label text-label-sm text-primary font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <span className="font-label text-label-sm text-outline/60">
                12 people grabbed this
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-32">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-secondary" />
            <span className="font-label text-label-sm text-secondary tracking-[0.2em] uppercase">
              Related Doodles
            </span>
          </div>
          <h2 className="font-display text-headline-lg md:text-[clamp(2rem,4vw,36px)] leading-tight mb-10">
            More from the{" "}
            <span className="doodle-underline text-primary">Sketchbook</span>
          </h2>

          {related.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-surface-container border-2 border-dashed border-outline-variant/30 rounded-2xl p-12 text-center">
              <Pen className="w-10 h-10 text-outline/30 mx-auto mb-4" />
              <p className="font-body text-body-lg text-on-surface/50">
                No other doodles in this sketchbook yet.
              </p>
              <Link
                href="/store"
                className="inline-flex items-center gap-2 font-body text-body-md text-primary hover:text-primary-container transition-colors mt-3"
              >
                Browse all drops
              </Link>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 font-body text-body-md text-on-surface/60 border-2 border-outline-variant/40 rounded-xl px-6 py-3 transition-all duration-200 hover:border-primary hover:text-primary hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-hard-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all drops
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
