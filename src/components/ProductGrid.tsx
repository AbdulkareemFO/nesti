'use client'

import { useEffect, useState } from 'react'
import { supabasePublic } from '@/lib/supabase/client'
import { useNestiTheme } from '@/lib/theme'
import { ProductCard } from './ProductCard'
import type { Product } from '@/lib/types'

export function ProductGrid({ categoryId }: { categoryId?: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { allowedGenderTags } = useNestiTheme()

  useEffect(() => {
    let query = supabasePublic.from('products').select('*').eq('is_active', true)
    if (categoryId) query = query.eq('category_id', categoryId)

    query.then(({ data, error }) => {
      if (!error && data) setProducts(data as Product[])
      setLoading(false)
    })
  }, [categoryId])

  const visible = allowedGenderTags
    ? products.filter((p) => allowedGenderTags.includes(p.gender_tag))
    : products

  if (loading) return <p style={{ textAlign: 'center', padding: 40 }}>Loading products…</p>
  if (visible.length === 0)
    return <p style={{ textAlign: 'center', padding: 40, color: '#999' }}>No products yet in this view.</p>

  return (
    <div style={styles.grid}>
      {visible.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: 20,
    padding: '0 20px 40px',
    maxWidth: 1000,
    margin: '0 auto',
  },
}
