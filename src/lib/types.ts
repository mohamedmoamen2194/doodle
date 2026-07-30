export interface Product {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number | null
  images: string[]
  category?: { id: string; name: string; slug: string } | null
  badges: string[]
  description: string | null
  specs: { label: string; value: string }[]
  artist: string | null
  medium: string | null
  stock: number
  isFeatured: boolean
}
