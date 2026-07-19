'use client'

import Link from 'next/link'
import type { Product } from '@/lib/types'
import { useNestiTheme } from '@/lib/theme'

export function ProductCard({ product }: { product: Product }) {
  const { color } = useNestiTheme()

  return (
    <Link href={`/product/${product.id}`} style={styles.card}>
      <div style={{ ...styles.imageBox, borderColor: color }}>
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name_en} style={styles.image} />
        ) : (
          <div style={{ ...styles.placeholder, background: color + '22' }} />
        )}
        {product.stock_status === 'out_of_stock' && (
          <span style={styles.badge}>Out of stock</span>
        )}
      </div>
      <p style={styles.name}>{product.name_en}</p>
      <p style={{ ...styles.price, color }}>${product.price_usd.toFixed(2)}</p>
    </Link>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: { textDecoration: 'none', color: 'inherit' },
  imageBox: {
    position: 'relative',
    aspectRatio: '1',
    borderRadius: 16,
    border: '2px solid',
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  placeholder: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    fontSize: 11,
    padding: '3px 8px',
    borderRadius: 999,
  },
  name: { fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 2 },
  price: { fontSize: 14, fontWeight: 700 },
}
