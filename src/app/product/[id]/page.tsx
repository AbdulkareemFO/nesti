'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabasePublic } from '@/lib/supabase/client'
import { useNestiTheme } from '@/lib/theme'
import type { Product } from '@/lib/types'

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { color } = useNestiTheme()

  useEffect(() => {
    supabasePublic
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle()
      .then(({ data }) => {
        setProduct(data as Product | null)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p style={{ textAlign: 'center', padding: 60 }}>Loading…</p>
  if (!product) return <p style={{ textAlign: 'center', padding: 60 }}>Product not found.</p>

  return (
    <main style={styles.wrap}>
      <div style={{ ...styles.imageBox, borderColor: color }}>
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name_en} style={styles.image} />
        ) : (
          <div style={{ ...styles.placeholder, background: color + '22' }} />
        )}
      </div>
      <h1 style={styles.name}>{product.name_en}</h1>
      <p style={{ ...styles.price, color }}>${product.price_usd.toFixed(2)}</p>
      {product.description_en && <p style={styles.desc}>{product.description_en}</p>}

      {/* Wishlist / gifting actions land here in later phases */}
      <button style={{ ...styles.button, background: color }} disabled>
        Add to wishlist (coming soon)
      </button>
    </main>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { maxWidth: 500, margin: '0 auto', padding: '30px 20px 60px' },
  imageBox: {
    aspectRatio: '1',
    borderRadius: 20,
    border: '2px solid',
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  placeholder: { width: '100%', height: '100%' },
  name: { fontSize: 24, fontWeight: 700, color: '#333', marginBottom: 6 },
  price: { fontSize: 20, fontWeight: 700, marginBottom: 16 },
  desc: { fontSize: 15, color: '#555', lineHeight: 1.6, marginBottom: 24 },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    border: 'none',
    color: 'white',
    fontSize: 16,
    fontWeight: 600,
    opacity: 0.6,
  },
}
