'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabasePublic } from '@/lib/supabase/client'
import { useNestiTheme } from '@/lib/theme'
import type { Category } from '@/lib/types'

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const { color } = useNestiTheme()

  useEffect(() => {
    supabasePublic
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setCategories(data as Category[])
        setLoading(false)
      })
  }, [])

  if (loading) return <p style={{ textAlign: 'center', padding: 40 }}>Loading categories…</p>
  if (categories.length === 0) return null

  return (
    <div style={styles.grid}>
      {categories.map((cat) => (
        <Link key={cat.id} href={`/category/${cat.slug}`} style={styles.card}>
          <div style={{ ...styles.imageBox, borderColor: color }}>
            {cat.image_url ? (
              <img src={cat.image_url} alt={cat.name_en} style={styles.image} />
            ) : (
              <div style={{ ...styles.placeholder, background: color + '22' }} />
            )}
          </div>
          <p style={styles.name}>{cat.name_en}</p>
        </Link>
      ))}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: 16,
    padding: '0 20px 40px',
    maxWidth: 1000,
    margin: '0 auto',
  },
  card: { textDecoration: 'none', color: 'inherit', textAlign: 'center' },
  imageBox: {
    aspectRatio: '1',
    borderRadius: 16,
    border: '2px solid',
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  placeholder: { width: '100%', height: '100%' },
  name: { fontSize: 14, fontWeight: 600, color: '#333' },
}
