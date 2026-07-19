'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Step = 'phone' | 'otp' | 'register'

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | ''>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSendOtp() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/consumer/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send code')
      setStep('otp')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOtp() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/consumer/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Invalid code')

      if (data.isNewUser) {
        setStep('register')
      } else {
        router.push(`/w/${data.username}`)
      }
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/consumer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, username, fullName, gender }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      router.push(`/w/${data.username}`)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.logo}>nesti</h1>

        {step === 'phone' && (
          <>
            <p style={styles.subtitle}>Enter your phone number</p>
            <input
              style={styles.input}
              type="tel"
              placeholder="05XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {error && <p style={styles.error}>{error}</p>}
            <button style={styles.button} onClick={handleSendOtp} disabled={loading || !phone}>
              {loading ? '...' : 'Send code'}
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <p style={styles.subtitle}>Enter the code sent to {phone}</p>
            <input
              style={styles.input}
              type="text"
              placeholder="6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
            {error && <p style={styles.error}>{error}</p>}
            <button style={styles.button} onClick={handleVerifyOtp} disabled={loading || otp.length !== 6}>
              {loading ? '...' : 'Verify'}
            </button>
          </>
        )}

        {step === 'register' && (
          <>
            <p style={styles.subtitle}>Set up your wishlist</p>
            <input
              style={styles.input}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
            />
            <input
              style={styles.input}
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <div style={styles.genderRow}>
              <button
                style={{ ...styles.genderBtn, ...(gender === 'female' ? styles.genderBtnActive : {}) }}
                onClick={() => setGender('female')}
              >
                Female
              </button>
              <button
                style={{ ...styles.genderBtn, ...(gender === 'male' ? styles.genderBtnActive : {}) }}
                onClick={() => setGender('male')}
              >
                Male
              </button>
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <button
              style={styles.button}
              onClick={handleRegister}
              disabled={loading || !username || !fullName}
            >
              {loading ? '...' : 'Create wishlist'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #E8A1AC 0%, #8AA0AB 100%)',
    fontFamily: 'Avenir, sans-serif',
  },
  card: {
    background: 'white',
    borderRadius: 20,
    padding: '40px 32px',
    width: '100%',
    maxWidth: 380,
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  },
  logo: {
    textAlign: 'center',
    fontSize: 32,
    color: '#8AA0AB',
    marginBottom: 24,
    fontWeight: 400,
  },
  subtitle: {
    color: '#555',
    fontSize: 14,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 10,
    border: '1px solid #ddd',
    fontSize: 15,
    marginBottom: 12,
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '13px',
    borderRadius: 10,
    border: 'none',
    background: '#E8A1AC',
    color: 'white',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: 4,
  },
  genderRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 12,
  },
  genderBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: 10,
    border: '1px solid #ddd',
    background: 'white',
    color: '#555',
    cursor: 'pointer',
  },
  genderBtnActive: {
    background: '#8AA0AB',
    color: 'white',
    borderColor: '#8AA0AB',
  },
  error: {
    color: '#c0392b',
    fontSize: 13,
    marginBottom: 8,
  },
}
