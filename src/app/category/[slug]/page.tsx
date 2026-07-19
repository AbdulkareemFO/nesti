'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabasePublic } from '@/lib/supabase/client'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { ProductGrid } from '@/components/ProductGrid'
import type { Category } from '@/lib/types'

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [category, setCategory] = useState<Category | null>(null)

  useEffect(() => {
    supabasePublic
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data }) => setCategory(data as Category | null))
  }, [slug])

  return (
    <main>
      <div style={styles.hero}>
        <h1 style={styles.title}>{category?.name_en || '...'}</h1>
        <ThemeSwitcher />
      </div>
      {category && <ProductGrid categoryId={category.id} />}
    </main>
  )
}

const styles: Record<string, React.CSSProperties> = {
  hero: { textAlign: 'center', padding: '40px 20px 10px' },
  title: { fontSize: 28, fontWeight: 700, color: '#333', marginBottom: 8 },
}
