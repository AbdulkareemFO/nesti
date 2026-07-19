// Msegat SendSMS wrapper. Verify field names against your Msegat dashboard
// docs — this mirrors the standard SendSMS REST endpoint.
export async function sendOtpSms(phone: string, otpCode: string) {
  const res = await fetch('https://www.msegat.com/gw/sendsms.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userName: process.env.MSEGAT_USERNAME,
      apiKey: process.env.MSEGAT_API_KEY,
      numbers: phone.replace('+', ''),
      userSender: process.env.MSEGAT_SENDER_NAME || 'Nesti',
      msg: `Your Nesti verification code is: ${otpCode}`,
      msgEncoding: 'utf8',
    }),
  })

  const data = await res.json().catch(() => null)

  // Msegat returns {"code":"1","message":"..."} on success
  if (!data || data.code !== '1') {
    throw new Error(`Msegat send failed: ${JSON.stringify(data)}`)
  }

  return data
}

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
