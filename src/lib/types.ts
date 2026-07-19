export type Category = {
  id: string
  name_en: string
  name_ar: string
  slug: string
  image_url: string | null
  sort_order: number
}

export type Product = {
  id: string
  category_id: string
  name_en: string
  name_ar: string
  description_en: string | null
  description_ar: string | null
  price_usd: number
  images: string[]
  sku: string | null
  stock_status: 'in_stock' | 'out_of_stock' | 'made_to_order'
  gender_tag: 'boy' | 'girl' | 'unisex'
}
