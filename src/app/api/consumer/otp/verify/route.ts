import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { normalizeSaudiPhone } from '@/lib/phone'

export async function POST(req: NextRequest) {
  try {
    const { phone: rawPhone, otp } = await req.json()
    if (!rawPhone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP required' }, { status: 400 })
    }

    const phone = normalizeSaudiPhone(rawPhone)
    const supabase = getSupabaseServerClient()

    const { data: session, error: sessionError } = await supabase
      .from('consumer_otp_sessions')
      .select('*')
      .eq('phone', phone)
      .eq('otp_code', otp)
      .eq('verified', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 })
    }

    await supabase
      .from('consumer_otp_sessions')
      .update({ verified: true })
      .eq('id', session.id)

    // Check if this phone already has an account
    const { data: existingUser } = await supabase
      .from('consumer_users')
      .select('username')
      .eq('phone', phone)
      .maybeSingle()

    return NextResponse.json({
      success: true,
      phone,
      isNewUser: !existingUser,
      username: existingUser?.username || null,
    })
  } catch (err: any) {
    console.error('OTP verify error:', err)
    return NextResponse.json({ error: err.message || 'Failed to verify OTP' }, { status: 500 })
  }
}
