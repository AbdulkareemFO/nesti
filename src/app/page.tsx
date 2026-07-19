'use client'

import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { CategoryGrid } from '@/components/CategoryGrid'
import { ProductGrid } from '@/components/ProductGrid'
import { useNestiTheme } from '@/lib/theme'

export default function HomePage() {
  const { color } = useNestiTheme()

  return (
    <main>
      <div style={{ ...styles.hero, background: color }}>
        <img src="/nesti-logo-white.png" alt="Nesti" style={styles.logo} />
        <p style={styles.tagline}>What are you expecting?</p>
        <ThemeSwitcher />
      </div>

      <h2 style={styles.sectionTitle}>Shop by category</h2>
      <CategoryGrid />

      <h2 style={styles.sectionTitle}>All gifts</h2>
      <ProductGrid />
    </main>
  )
}

const styles: Record<string, React.CSSProperties> = {
  hero: { textAlign: 'center', padding: '50px 20px 20px', transition: 'background 0.3s' },
  logo: { height: 40, marginBottom: 12 },
  tagline: { color: 'rgba(255,255,255,0.9)', fontSize: 15, marginBottom: 8 },
  sectionTitle: { fontSize: 20, fontWeight: 700, textAlign: 'center', margin: '30px 0 16px', color: '#333' },
}
