'use client'

import { useNestiTheme, THEME_COLORS, ThemeKey } from '@/lib/theme'

export function ThemeSwitcher() {
  const { theme, setTheme } = useNestiTheme()

  return (
    <div style={styles.row}>
      {(Object.keys(THEME_COLORS) as ThemeKey[]).map((key) => {
        const active = theme === key
        return (
          <button
            key={key}
            onClick={() => setTheme(key)}
            style={{
              ...styles.btn,
              background: active ? THEME_COLORS[key].primary : 'white',
              color: active ? 'white' : '#333',
              borderColor: THEME_COLORS[key].primary,
            }}
          >
            {THEME_COLORS[key].label}
          </button>
        )
      })}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  row: { display: 'flex', gap: 10, justifyContent: 'center', padding: '20px 0' },
  btn: {
    padding: '10px 20px',
    borderRadius: 999,
    border: '2px solid',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
}
