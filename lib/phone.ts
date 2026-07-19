// Normalizes Saudi phone input to E.164 (+9665XXXXXXXX) so stored numbers
// always match regardless of how the user typed them (0504823433, 504823433,
// +966504823433, etc).
export function normalizeSaudiPhone(raw: string): string {
  let digits = raw.replace(/[^\d]/g, '')

  if (digits.startsWith('00966')) digits = digits.slice(2)
  if (digits.startsWith('966')) return `+${digits}`
  if (digits.startsWith('0')) return `+966${digits.slice(1)}`
  if (digits.length === 9) return `+966${digits}`

  // Fallback: return as-is with + prefix so it's at least consistent
  return digits.startsWith('+') ? digits : `+${digits}`
}
