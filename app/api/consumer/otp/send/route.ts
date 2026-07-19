import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { normalizeSaudiPhone } from '@/lib/phone'
import { sendOtpSms, generateOtp } from '@/lib/msegat'

export async function POST(req: NextRequest) {
  try {
    const { phone: rawPhone } = await req.json()
    if (!rawPhone) {
      return NextResponse.json({ error: 'Phone number required' }, { status: 400 })
    }

    const phone = normalizeSaudiPhone(rawPhone)
    const otpCode = generateOtp()
    const supabase = getSupabaseServerClient()

    // Invalidate any previous unverified sessions for this phone
    await supabase
      .from('consumer_otp_sessions')
      .delete()
      .eq('phone', phone)
      .eq('verified', false)

    const { error: insertError } = await supabase
      .from('consumer_otp_sessions')
      .insert({
        phone,
        otp_code: otpCode,
        expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      })

    if (insertError) {
      console.error('OTP insert error:', insertError)
      return NextResponse.json({ error: 'Could not create OTP session' }, { status: 500 })
    }

    await sendOtpSms(phone, otpCode)

    return NextResponse.json({ success: true, phone })
  } catch (err: any) {
    console.error('OTP send error:', err)
    return NextResponse.json({ error: err.message || 'Failed to send OTP' }, { status: 500 })
  }
}
