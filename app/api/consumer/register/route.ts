import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { normalizeSaudiPhone } from '@/lib/phone'

export async function POST(req: NextRequest) {
  try {
    const { phone: rawPhone, username, fullName, gender } = await req.json()

    if (!rawPhone || !username || !fullName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const phone = normalizeSaudiPhone(rawPhone)
    const supabase = getSupabaseServerClient()

    // Confirm this phone was actually OTP-verified recently
    const { data: verifiedSession } = await supabase
      .from('consumer_otp_sessions')
      .select('id')
      .eq('phone', phone)
      .eq('verified', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!verifiedSession) {
      return NextResponse.json({ error: 'Phone not verified' }, { status: 403 })
    }

    // Check username availability
    const { data: usernameTaken } = await supabase
      .from('consumer_users')
      .select('id')
      .eq('username', username)
      .maybeSingle()

    if (usernameTaken) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 409 })
    }

    const { data: newUser, error: insertError } = await supabase
      .from('consumer_users')
      .insert({ phone, username, full_name: fullName, gender })
      .select()
      .single()

    if (insertError) {
      console.error('Register insert error:', insertError)
      return NextResponse.json({ error: 'Could not create account' }, { status: 500 })
    }

    // Create the default wishlist for this new user
    await supabase.from('wishlists').insert({ user_id: newUser.id })

    return NextResponse.json({ success: true, username: newUser.username })
  } catch (err: any) {
    console.error('Register error:', err)
    return NextResponse.json({ error: err.message || 'Registration failed' }, { status: 500 })
  }
}
