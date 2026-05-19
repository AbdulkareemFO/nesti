// nesti-auth.jsx — Sign up, Login, OTP, AuthPrompt modal

function AuthShell({ children, title, eyebrow, side }){
  const { navigate } = useApp();
  return (
    <div className="auth-shell" style={{
      display:'grid', gridTemplateColumns: '1fr 1.2fr', minHeight: 'calc(100vh - 76px - 38px)',
    }}>
      <div className="auth-side" style={{
        background: 'var(--petal-50)',
        padding: '64px 56px',
        position:'relative', overflow:'hidden',
        display:'flex', flexDirection:'column', justifyContent:'space-between',
      }}>
        <div style={{
          position:'absolute', top: '-20%', right: '-20%', width: '70%', aspectRatio:'1/1',
          background: 'radial-gradient(circle at 40% 40%, var(--petal-200), transparent 70%)',
          opacity: .8, pointerEvents:'none',
        }}/>
        <button onClick={()=>navigate({name:'home'})} style={{
          background:'transparent', border:0, cursor:'pointer', textAlign:'left', padding: 0,
          position:'relative',
        }}>
          <NestiLogo size={26}/>
        </button>
        <div style={{ position:'relative', maxWidth: 460 }}>
          <h2 className="display italic" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: 0, lineHeight: 1.05 }}>
            {side?.headline || 'A gentle place,\nfor the people you love.'}
          </h2>
          <p style={{ fontSize: 15, color: 'var(--ink-700)', marginTop: 22, lineHeight: 1.6, maxWidth: 380 }}>
            {side?.sub || 'Sign in to save things, share with family, and keep your nest in one place.'}
          </p>
        </div>
        <div style={{ position:'relative', fontSize: 12, color: 'var(--ink-500)' }}>
          © Nesti, 2026 — made with care.
        </div>
      </div>
      <div className="auth-main" style={{
        padding: '64px 56px', display:'flex', flexDirection:'column', justifyContent:'center',
        background: 'var(--bg)',
      }}>
        <div style={{ maxWidth: 420, margin: '0 auto', width: '100%' }}>
          {eyebrow && <div style={{
            fontSize: 12, letterSpacing:'.14em', textTransform:'uppercase',
            color:'var(--petal-500)', fontWeight: 600, marginBottom: 12,
          }}>{eyebrow}</div>}
          <h1 className="display italic" style={{ fontSize: 'clamp(34px, 4vw, 48px)', margin: 0, lineHeight: 1.05 }}>{title}</h1>
          {children}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px){
          .auth-shell{ grid-template-columns: 1fr !important; }
          .auth-side{ padding: 36px 28px !important; min-height: 220px; }
          .auth-main{ padding: 36px 28px !important; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function SignUpPage(){
  const { navigate, signUp, addToast } = useApp();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [err, setErr] = React.useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@') || pw.length < 6){
      setErr('Please fill all fields. Passwords need 6+ characters.');
      return;
    }
    signUp({ name, email });
    navigate({ name: 'otp', email });
  };

  return (
    <AuthShell title="Make your nest." eyebrow="Create account"
      side={{ headline: 'A nest for what\u2019s coming.', sub: 'Save the gentle things, in one place. Share with the people you love.' }}>
      <p style={{ color:'var(--ink-500)', marginTop: 14, marginBottom: 32 }}>
        Free, no email noise. One soft place for your wishlist and orders.
      </p>
      <form onSubmit={submit} style={{ display:'grid', gap: 16 }}>
        <div>
          <label className="field-label">Your name</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Maya Khoury"/>
        </div>
        <div>
          <label className="field-label">Email</label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@home.com"/>
        </div>
        <div>
          <label className="field-label">Password</label>
          <div style={{ position:'relative' }}>
            <input className="input" type={show ? 'text' : 'password'} value={pw} onChange={e=>setPw(e.target.value)} placeholder="6+ characters" style={{paddingRight: 44}}/>
            <button type="button" onClick={()=>setShow(s=>!s)} style={{
              position:'absolute', right: 8, top: '50%', transform:'translateY(-50%)',
              border: 0, background:'transparent', cursor:'pointer', color: 'var(--ink-500)',
              width: 32, height: 32, display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <NIcon name={show ? 'eyeOff' : 'eye'} size={16}/>
            </button>
          </div>
        </div>
        {err && <div style={{ fontSize: 13, color: '#A04A38', background: 'var(--petal-50)', padding: 10, borderRadius: 10 }}>{err}</div>}
        <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: 8 }}>Create account</button>

        <div style={{ textAlign:'center', fontSize: 14, color:'var(--ink-500)' }}>
          Already have an account?{' '}
          <button type="button" onClick={()=>navigate({name:'login'})} style={{
            background:'transparent', border:0, color:'var(--ink-900)', cursor:'pointer',
            textDecoration: 'underline', textUnderlineOffset: 3, fontWeight: 500,
          }}>Log in</button>
        </div>

        <div style={{ fontSize: 11, color:'var(--ink-500)', textAlign:'center', marginTop: 6, lineHeight: 1.6 }}>
          By creating an account, you agree to our soft <u>terms</u> and <u>privacy</u> notice.
        </div>
      </form>
    </AuthShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function LoginPage(){
  const { navigate, signUp, addToast, pendingAuthAction } = useApp();
  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [show, setShow] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes('@') || pw.length < 1){
      addToast({ msg: 'Please enter an email and password.', icon: 'close' });
      return;
    }
    // Demo: synthesize a name from email
    signUp({ name: email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g, c=>c.toUpperCase()), email, skipOtp: true });
    addToast({ msg: 'Welcome back.', icon: 'check' });
    // If there's a pending gift purchase, signUp() will route to gift-checkout; otherwise go home.
    if (!pendingAuthAction?.giftContext){
      navigate({ name: 'home' });
    }
  };

  return (
    <AuthShell title="Welcome back." eyebrow="Log in"
      side={{ headline: 'Pick up where\nyou left off.', sub: 'Your wishlist and cart are waiting, untouched.' }}>
      <p style={{ color:'var(--ink-500)', marginTop: 14, marginBottom: 32 }}>
        Sign in to your Nesti.
      </p>
      <form onSubmit={submit} style={{ display:'grid', gap: 16 }}>
        <div>
          <label className="field-label">Email</label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@home.com"/>
        </div>
        <div>
          <label className="field-label">Password</label>
          <div style={{ position:'relative' }}>
            <input className="input" type={show ? 'text' : 'password'} value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" style={{paddingRight: 44}}/>
            <button type="button" onClick={()=>setShow(s=>!s)} style={{
              position:'absolute', right: 8, top: '50%', transform:'translateY(-50%)',
              border: 0, background:'transparent', cursor:'pointer', color: 'var(--ink-500)',
              width: 32, height: 32, display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <NIcon name={show ? 'eyeOff' : 'eye'} size={16}/>
            </button>
          </div>
          <div style={{ textAlign:'right', marginTop: 6 }}>
            <button type="button" style={{ background:'transparent', border:0, color:'var(--ink-500)', cursor:'pointer', fontSize: 13 }}>Forgot?</button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: 4 }}>Log in</button>

        <div style={{ textAlign:'center', fontSize: 14, color:'var(--ink-500)' }}>
          New here?{' '}
          <button type="button" onClick={()=>navigate({name:'signup'})} style={{
            background:'transparent', border:0, color:'var(--ink-900)', cursor:'pointer',
            textDecoration: 'underline', textUnderlineOffset: 3, fontWeight: 500,
          }}>Create an account</button>
        </div>
      </form>
    </AuthShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function OTPPage({ email }){
  const { navigate, verifyOtp, addToast } = useApp();
  const [digits, setDigits] = React.useState(['','','','','','']);
  const inputs = React.useRef([]);
  const [seconds, setSeconds] = React.useState(60);
  const [err, setErr] = React.useState('');

  React.useEffect(()=>{
    if (seconds <= 0) return;
    const t = setTimeout(()=>setSeconds(s=>s-1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  React.useEffect(()=>{ inputs.current[0]?.focus(); }, []);

  const onChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...digits]; next[i] = v; setDigits(next);
    if (v && i < 5) inputs.current[i+1]?.focus();
  };
  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) inputs.current[i-1]?.focus();
  };
  const onPaste = (e) => {
    const text = (e.clipboardData?.getData('text') || '').replace(/\D/g,'').slice(0,6);
    if (!text) return;
    e.preventDefault();
    const arr = ['','','','','',''];
    for (let i=0;i<text.length;i++) arr[i] = text[i];
    setDigits(arr);
    inputs.current[Math.min(text.length, 5)]?.focus();
  };

  const submit = (e) => {
    e?.preventDefault();
    const code = digits.join('');
    if (code.length !== 6){ setErr('Please enter all 6 digits.'); return; }
    // Demo: any 6-digit code works
    verifyOtp();
    addToast({ msg: 'Verified. Welcome to Nesti.', icon: 'check' });
    navigate({ name: 'home' });
  };

  return (
    <AuthShell title="Check your inbox."
      eyebrow="One last step"
      side={{ headline: 'Almost there.', sub: 'A tiny code, then your nest is open.' }}>
      <p style={{ color:'var(--ink-500)', marginTop: 14, marginBottom: 28, fontSize: 15 }}>
        We sent a 6-digit code to <strong style={{ color: 'var(--ink-900)' }}>{email || 'you@home.com'}</strong>.
        Enter it below to finish creating your account.
      </p>
      <form onSubmit={submit}>
        <div style={{ display:'flex', gap: 10, justifyContent:'space-between' }} onPaste={onPaste}>
          {digits.map((d, i) => (
            <input key={i}
              ref={el => inputs.current[i] = el}
              value={d}
              onChange={e => onChange(i, e.target.value)}
              onKeyDown={e => onKey(i, e)}
              inputMode="numeric"
              maxLength="1"
              style={{
                width: 52, height: 64, textAlign:'center',
                border: '1px solid var(--line-strong)', borderRadius: 14,
                background: 'var(--surface)', fontSize: 22, fontWeight: 600,
                color: 'var(--ink-900)', fontFamily: 'var(--font-display)',
                outline: 'none',
              }}
              onFocus={e=>e.target.style.borderColor='var(--petal-300)'}
              onBlur={e=>e.target.style.borderColor='var(--line-strong)'}
            />
          ))}
        </div>
        {err && <div style={{ fontSize: 13, color: '#A04A38', background: 'var(--petal-50)', padding: 10, borderRadius: 10, marginTop: 14 }}>{err}</div>}
        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 24 }}>
          Verify and continue
        </button>
        <div style={{ textAlign:'center', marginTop: 18, fontSize: 13, color: 'var(--ink-500)' }}>
          Didn't get it?{' '}
          {seconds > 0 ? (
            <>Resend in <strong style={{ color:'var(--ink-900)' }}>{seconds}s</strong></>
          ) : (
            <button type="button" onClick={()=>{setSeconds(60);}} style={{
              background:'transparent', border:0, color:'var(--ink-900)', cursor:'pointer',
              textDecoration:'underline', textUnderlineOffset: 3, fontWeight: 500,
            }}>Resend code</button>
          )}
        </div>
        <div style={{ textAlign:'center', marginTop: 8 }}>
          <button type="button" onClick={()=>navigate({name:'signup'})} style={{
            background:'transparent', border:0, color:'var(--ink-500)', cursor:'pointer', fontSize: 13,
          }}><NIcon name="arrowLeft" size={12}/> Wrong email</button>
        </div>
      </form>
    </AuthShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AuthPrompt modal — shown when guest tries wishlist or checkout
function AuthPrompt({ open, reason, onClose }){
  const { navigate } = useApp();
  if (!open) return null;
  const copy = reason === 'checkout' ? {
    title: 'Sign in to finish your order',
    sub: 'Your cart is waiting. Sign in or create a free account to check out securely.',
    icon: 'lock',
  } : reason === 'buyGift' ? {
    title: 'Sign in to send your gift',
    sub: "Almost there. Create a free account or sign in to complete the purchase — your gift will be on its way in a minute.",
    icon: 'bag',
  } : {
    title: 'Sign in to start your wishlist',
    sub: 'Your wishlist lives in your account — so you can share it, edit it, and find it from any device.',
    icon: 'heart',
  };

  return (
    <Modal open={open} onClose={onClose} width={460}>
      <div style={{
        width: 56, height: 56, borderRadius: 999, background: 'var(--petal-50)',
        display:'flex', alignItems:'center', justifyContent:'center',
        color:'var(--petal-400)', marginBottom: 16,
      }}>
        <NIcon name={copy.icon} size={24}/>
      </div>
      <h3 className="display italic" style={{ fontSize: 28, margin: 0, lineHeight: 1.1 }}>{copy.title}</h3>
      <p style={{ color:'var(--ink-500)', marginTop: 12, fontSize: 15 }}>{copy.sub}</p>
      <div style={{ display:'grid', gap: 10, marginTop: 24 }}>
        <button className="btn btn-primary btn-lg" onClick={()=>{onClose(); navigate({name:'signup'});}}>Create a free account</button>
        <button className="btn btn-outline" onClick={()=>{onClose(); navigate({name:'login'});}}>I already have one</button>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Maybe later</button>
      </div>
    </Modal>
  );
}

Object.assign(window, { SignUpPage, LoginPage, OTPPage, AuthPrompt, AuthShell });
