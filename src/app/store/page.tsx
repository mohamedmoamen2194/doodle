import Filters from "@/components/store/Filters"
import ProductGrid from "@/components/store/ProductGrid"
import { Star, Pen, Sparkles, Palette, Hand } from "lucide-react"
import { db, schema } from "@/lib/db"
import { eq, and, ilike, desc, asc, sql, inArray } from "drizzle-orm"
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

export default async function StorePage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams

  const conditions = [eq(schema.products.isActive, true)]

  const mediumParam = searchParams.medium
  const artistParam = searchParams.artist
  const searchParam = searchParams.search
  const sortParam = searchParams.sort as string | undefined
  const featuredParam = searchParams.featured

  if (mediumParam) {
    const mediums = Array.isArray(mediumParam) ? mediumParam : [mediumParam]
    conditions.push(inArray(schema.products.medium, mediums))
  }

  if (artistParam) {
    const artists = Array.isArray(artistParam) ? artistParam : [artistParam]
    conditions.push(inArray(schema.products.artist, artists))
  }

  if (searchParam) {
    conditions.push(ilike(schema.products.name, `%${searchParam}%`))
  }

  if (featuredParam === "true") {
    conditions.push(eq(schema.products.isFeatured, true))
  }

  const orderBy = sortParam === "price_asc"
    ? asc(schema.products.price)
    : sortParam === "price_desc"
    ? desc(schema.products.price)
    : desc(schema.products.createdAt)

  const rows = await db
    .select()
    .from(schema.products)
    .leftJoin(schema.categories, eq(schema.products.categoryId, schema.categories.id))
    .where(and(...conditions))
    .orderBy(orderBy)

  const products: Product[] = rows.map(mapProduct)

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(schema.products)
    .where(and(...conditions))

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none" style={{
        backgroundImage: `
          linear-gradient(rgba(255, 177, 196, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 177, 196, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
      }} />

      <div className="absolute inset-0 pointer-events-none select-none">
        <Pen className="absolute top-32 left-[8%] w-12 h-12 md:w-16 md:h-16 text-primary/5 -rotate-12" />
        <Hand className="absolute top-64 right-[6%] w-14 h-14 md:w-20 md:h-20 text-primary/5 rotate-6" />
        <Palette className="absolute bottom-48 left-[12%] w-16 h-16 md:w-24 md:h-24 text-primary/5 -rotate-6" />
        <Star className="absolute top-48 right-[15%] w-8 h-8 text-primary/10 animate-float" />
        <Sparkles className="absolute bottom-32 right-[20%] w-6 h-6 text-primary/10 animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-16 py-8 md:py-20">
        <div className="mb-2">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-label text-label-sm text-primary tracking-[0.2em] uppercase">
              The Archive
            </span>
          </div>
          <h1 className="font-display text-[clamp(2rem,12vw,3rem)] md:text-[clamp(3rem,8vw,72px)] leading-tight relative inline-block">
            NEW
            <br />
            <span className="doodle-underline text-primary">DROPS</span>
          </h1>
          <p className="font-body text-body-md text-on-surface/60 mt-4">
            Showing {products.length} of {Number(count)} sketches
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-12">
          <aside className="w-full md:w-[280px] shrink-0">
            <Filters />
          </aside>

          <div className="flex-1 min-w-0">
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="bg-surface-container rounded-2xl border-2 border-dashed border-primary/20 p-12 md:p-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Pen className="w-8 h-8 text-primary/40" />
                </div>
                {mediumParam || artistParam || searchParam || featuredParam ? (
                  <>
                    <p className="font-display text-headline-md text-outline/50 mb-2">No sketches match</p>
                    <p className="font-body text-body-md text-outline/40 max-w-xs mx-auto">Try adjusting your filters or search term.</p>
                  </>
                ) : (
                  <>
                    <p className="font-display text-headline-md text-outline/50 mb-2">The sketchbook is empty</p>
                    <p className="font-body text-body-md text-outline/40 max-w-xs mx-auto">No products yet. Check back soon for new drops.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
